
import { Specialties } from '../models/Specialties.js'


export const getOneSpecialties = async ( req , res ) =>{
        const { id } = req.params;

        try {
            
            const getOneSpecialties = await Specialties.findByPk(id)

            if(!getOneSpecialties){
                return res.status( 402 ).json({ message: `la especialidad no existe` })
            }else{
                res.status( 200 ).json({ data : getOneSpecialties })
            }


        } catch (error) {
            return res.status( 500 ).json({ message: error })
        }
}

export const getAllSpecialties = async ( req , res ) =>{

    try {
        const getAllSpecialties  = await Specialties.findAll();
        return res.status( 200 ).json({ data : getAllSpecialties })
    } catch ( error ) {
        return res.status( 500 ).json({ message: error })
    }
}

export const CreateSpecialties = async ( req , res ) =>{
    const { name } = req.body

    try {
        
        const findSpecialties = await Specialties.findOne({ where : { name : name}})
        if(findSpecialties){ return res.status( 402 ).json({ message : `La Especialidad ya esta en la lista`})}

        const createSpecialties = await Specialties.create({
            name
        })

        return res.status( 200 ).json({ data : createSpecialties})
    } catch ( error ) {
        return res.status( 500 ).json({ message: error })
    }
}

export const updateSpecialties = async ( req, res ) =>{
    const {  id } = req.params;

    
    try {
        const updateSpecialties = await Specialties.findByPk(id);
        console.log('DE LA BASE DE DATOS',updateSpecialties);

        if(!updateSpecialties) return res.status( 400 ).json({ message: `La Especialidad no existe` });
            updateSpecialties.update(req.body);
            updateSpecialties.save()
        return res.status( 200 ).json({ data: updateSpecialties})

    } catch (error) {
        return res.status( 500 ).json({ message: error })
    }
}

export const deleteSpecialties = async ( req, res ) =>{
    const { id } = req.params;
    console.log(id);
    try {
        const deleteSpecialties = await Specialties.destroy({ where: { id } })
        return res.status( 200 ).json({ data: deleteSpecialties})
    } catch (error) {
        return res.status( 500 ).json({ message: error.message })
    }
}