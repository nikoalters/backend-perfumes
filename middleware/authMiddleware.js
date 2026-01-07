import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'; // <--- Faltaba importar esto
import User from '../models/User.js'; // ✅ Perfecto (con Mayúscula)

// 1. Middleware PROTECT (Para usuarios logueados)
// Envolvemos la función en asyncHandler para manejar errores automáticamente
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Obtener el token del encabezado
            token = req.headers.authorization.split(' ')[1];

            // Decodificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscar al usuario en la BD (sin contraseña)
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

// 2. Middleware ADMIN (Para administradores)
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('No autorizado como administrador');
    }
};

// Exportamos AMBOS
export { protect, admin };