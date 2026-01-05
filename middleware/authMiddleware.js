import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 1. Middleware PROTECT (Para usuarios logueados)
const protect = async (req, res, next) => {
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
            // Usamos res.status(401) y lanzamos error para que el manejador de errores lo capture
            res.status(401); 
            throw new Error('No autorizado, token fallido');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('No autorizado, no hay token');
    }
};

// 2. Middleware ADMIN (Para administradores) <--- ESTO ES LO NUEVO
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // Tiene credencial VIP, pase por favor.
    } else {
        res.status(401);
        throw new Error('No autorizado como administrador'); // Se queda afuera.
    }
};

// Exportamos AMBOS
export { protect, admin };