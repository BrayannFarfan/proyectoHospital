import { Medic } from '../models/Medic.js';
import { Specialties } from '../models/Specialties.js';


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

export const CreateMedic = async ( req , res ) =>{
    const  { name, lastName, cardMedic, specialtyId } = req.body

    try {
        
        const findMedic = await Medic.findOne({ where : { cardMedic : cardMedic}})
        if(findMedic){ return res.status( 402 ).json({ message : `El medico ${findMedic.name} ${findMedic.lastName} ya está creado`})}

        const findSpecialty = await Specialties.findOne({ where: { id: specialtyId}})
        if(!findSpecialty) return res.status( 400 ).json({ message: `La especialidad ${ specialtyId } no existe`})

console.log(findSpecialty);


            const createMedic = await Medic.create({
                name,
                lastName,
                cardMedic,
                specialtyId : findSpecialty.id
            })
            await createMedic.save()
            return res.status( 200 ).json({ data : createMedic})
    } catch ( error ) {
        return res.status( 500 ).json({ message: error.message })
    }
}

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