import { Appointment } from '../models/Appointment.js';
import { Availability } from '../models/Availability.js';
import { Medic } from '../models/Medic.js';
import { Specialties } from '../models/Specialties.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getOneMedic = async ( req , res ) =>{
    const { id } = req.params;

    try {
        
        const getOneMedic = await Medic.findByPk(id,{
            include:[
                {
                    model: Specialties,
                    as: "specialty"
                }
            ]
        })

        if(!getOneMedic){
            return res.status( 402 ).json({ message: `El medico no existe` })
        }else{
            res.status( 200 ).json({ data : getOneMedic })
        }


    } catch (error) {
        return res.status( 500 ).json({ message: error })
    }
}

export const getAllMedic = async ( req , res ) =>{

try {
    const getAllMedic  = await Medic.findAll();
    return res.status( 200 ).json({ data : getAllMedic })
} catch ( error ) {
    return res.status( 500 ).json({ message: error })
}
}

export const CreateMedic = async (req, res) => {
  const { name, lastName, cardMedic, specialtyId } = req.body;

  try {
    const findMedic = await Medic.findOne({ where: { cardMedic: cardMedic } });
    if (findMedic) {
      return res.status(402).json({ message: `El médico ${findMedic.name} ${findMedic.lastName} ya está creado` });
    }

    const findSpecialty = await Specialties.findOne({ where: { id: specialtyId } });
    if (!findSpecialty) {
      return res.status(400).json({ message: `La especialidad ${specialtyId} no existe` });
    }

    const createMedic = await Medic.create({
      name,
      lastName,
      cardMedic,
      specialtyId: findSpecialty.id,
    });

    if (req.file) {
      const tempPath = req.file.path;
      const newFileName = `medic-${createMedic.id}-${Date.now()}${path.extname(req.file.originalname)}`;
      const newPath = path.join(__dirname, '../uploads/medics', newFileName);

      await fs.rename(tempPath, newPath);

      createMedic.profilePic = `uploads/medics/${newFileName}`;
      await createMedic.save();
    }

    return res.status(200).json({ data: createMedic });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMedic = async ( req, res ) =>{
const {  id } = req.params;


try {
    const updateMedic = await Medic.findByPk(id);

    if(!updateMedic) return res.status( 400 ).json({ message: `El medico no existe` });
    updateMedic.update(req.body);
    updateMedic.save()
    return res.status( 200 ).json({ data: updateMedic})

} catch (error) {
    return res.status( 500 ).json({ message: error })
}
}

export const deleteMedic = async ( req, res ) =>{
    const { id } = req.params;
    try {
        const deleteMedic = await Medic.destroy({ where: { id } })
        return res.status( 200 ).json({ data: deleteMedic})
    } catch (error) {
        return res.status( 500 ).json({ message: error.message })
    }
}

export const getOneMedicAvailable = async (req, res) => {
  const { id: medicId } = req.params;

  try {
    const doctor = await Medic.findByPk(medicId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const availabilities = await Availability.findAll({
      where: { MedicId: medicId, isAvailable: true },
      attributes: ['date', 'time'],
    });

    const existingAppointments = await Appointment.findAll({
      where: { MedicId: medicId },
      attributes: ['date', 'time'],
    });

    const occupiedTimes = existingAppointments.map((appt) => ({
      date: appt.date,
      time: appt.time,
    }));

    if (availabilities.length === 0) {
      return res.status(200).json({
        message: 'No schedules or dates available for this doctor',
      });
    }

    const availabilityByDate = availabilities.reduce((acc, avail) => {
      const { date, time } = avail;
      const timeKey = time;
      const isOccupied = occupiedTimes.some(
        (appt) => appt.date === date && appt.time === timeKey
      );

      if (!isOccupied) {
        if (!acc[date]) {
          acc[date] = [];
        }
        const [hourMinute, period] = time.split(' ');
        const [hour, minute] = hourMinute.split(':').map(Number);
        acc[date].push({ hour, minute, period });
      }
      return acc;
    }, {});

    res.json(availabilityByDate);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available times', error: error.message });
  }
};

export const setMedicAvailability = async (req, res) => {
  const { id: MedicId } = req.params;
  const { date, time } = req.body;

  try {
    const doctor = await Medic.findByPk(MedicId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (!Array.isArray(date) || !Array.isArray(time) || time.length === 0) {
      return res.status(400).json({ message: 'Invalid input: date and time must be non-empty arrays' });
    }

    let datesToUse = date;
    if (date.length === 1) {
      datesToUse = Array(time.length).fill(date[0]);
    } else if (date.length !== time.length) {
      return res.status(400).json({ message: 'Invalid input: date and time arrays must have equal length when multiple dates are provided' });
    }


    const existingAvailabilities = await Availability.findAll({
      where: {
        MedicId: MedicId,
        date: datesToUse, 
        time: time,    
      },
    });

    if (existingAvailabilities.length > 0) {
      const duplicateTimes = existingAvailabilities.map((avail) => avail.time);
      return res.status(400).json({
        message: 'Duplicate availability entries found',
        duplicates: duplicateTimes,
      });
    }


    const availabilities = datesToUse.map((d, index) => ({
      MedicId: MedicId,
      date: d,
      time: time[index],
      isAvailable: true,
    }));

    const createdAvailabilities = await Availability.bulkCreate(availabilities, { validate: true });
    res.status(201).json({ message: 'Availability set successfully', availabilities: createdAvailabilities });
  } catch (error) {
    res.status(500).json({ message: 'Error setting available times', error: error.message });
  }
};