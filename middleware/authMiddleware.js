import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'; // <--- Ahora sí funciona porque lo instalaste
import User from '../models/User.js'; // ✅ Con la 'U' mayúscula correcta

// 1. Middleware PROTECT (Limpio y profesional)
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Buscamos el usuario
            req.user = await User.findById(decoded.id).select('-password');
            
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('No autorizado, token fallido');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('No autorizado, no hay token');
    }
});

// 2. Middleware ADMIN
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('No autorizado como administrador');
    }
};

export { protect, admin };