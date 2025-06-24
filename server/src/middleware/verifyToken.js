import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Access token missing' });
    }
    const token = authHeader && authHeader.split(' ')[1];

    try {
        const decoded =  jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }

   
};