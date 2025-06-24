import { Patient } from '../models/Patient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'some_default_secret';

export const AuthLogin = async ( req , res ) =>{

    const { email, password } = req.body;

    try {

        const getUser = await Patient.findOne({ where: { email : email }})
        if( !getUser){ return res.status( 402 ).json({ message: `Email incorrecto` })}

        const passCompared  = await bcrypt.compare(password, getUser.password) 

        if( !passCompared){ return res.status( 402 ).json({ message: `El password es incorrecto` })}

        const { password: _, ...userWithoutPassword } = getUser.dataValues;

        const token = jwt.sign(
            { id: getUser.id }, jwtSecret, { expiresIn: '1h' }
        );

        return res.status(200).json({
            status: 200,
            message: 'Login exitoso',
            token: token,
            data: userWithoutPassword
        })
        
    } catch (error) {
        return res.status(500).json({message: error})
    }
}