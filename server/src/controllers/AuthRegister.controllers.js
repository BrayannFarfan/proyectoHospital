import { Patient } from '../models/Patient.js';
import bcrypt from 'bcryptjs';

export const AuthRegister = async ( req , res ) =>{
    const { name, lastName, greenCard, phone, address, email, password } = req.body

    try {
        
        const passHass = await bcrypt.hash(password, 10)
        
        const findGreenCard = await Patient.findOne({ where: { greenCard: greenCard } });
        if (findGreenCard ) {
            return res.status(400).json({ message: `La Greend Card ${greenCard} ya esta registrada.Por favor intente con otra.` });
        }
        
        
        const findEmail = await Patient.findOne({ where:{ email: email }})
        if( findEmail ) {
            return res.status( 400 ).json({ message: `Ya hay un usuario con el email ${email} intente con otro email` })
        }else{
            const patient = await Patient.create({ name, lastName, greenCard, phone, address, email, password:passHass })
            return res.status( 200 ).json({ status: 200, data: patient, })

        }
    } catch (error) {
        res.json({error : error})
    }
}