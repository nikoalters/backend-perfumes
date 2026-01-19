import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuración del transporte (El Cartero)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Tu nuevo correo
    pass: process.env.EMAIL_PASS  // La clave de 16 letras
  }
});

// Verificamos que la conexión funcione al iniciar el servidor
transporter.verify().then(() => {
    console.log('📧 Configuración de correo: LISTA Y CONECTADA');
}).catch((err) => {
    console.log('❌ Error al conectar con Gmail:', err);
});

export default transporter;