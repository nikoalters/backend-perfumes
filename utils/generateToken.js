import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    // Genera un token que dura 30 días
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

export default generateToken;