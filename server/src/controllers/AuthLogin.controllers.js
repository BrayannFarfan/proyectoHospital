import { Patient } from '../models/Patient.js';
import bcrypt from 'bcryptjs';

export const AuthLogin = async ( req , res ) =>{

    const { email, password } = req.body;

    try {

        const getUser = await Patient.findOne({ where: { email : email }})
        if( !getUser){ return res.status( 402 ).json({ message: `Email incorrecto` })}

        const passCompared  = await bcrypt.compare(password, getUser.password) 

        if( !passCompared){ return res.status( 402 ).json({ message: `El password es incorrecto` })}

        return res.status(200).json({message: `Success`})
        
    } catch (error) {
        return res.status(500).json({message: error})
    }
}