import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // <--- AQUÍ ESTABA EL CAMBIO CLAVE

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Obtener el token del encabezado (quitando la palabra "Bearer")
            token = req.headers.authorization.split(' ')[1];

            // Decodificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscar al usuario en la base de datos (sin la contraseña)
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'No autorizado, token fallido' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

export { protect };