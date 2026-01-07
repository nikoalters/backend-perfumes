import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- CONEXIÓN DIRECTA A MONGODB ---
// Usamos la URL directa para evitar el error de variable 'undefined' en Render
const mongoURI = 'mongodb+srv://admin:Nohay123.@cluster0.57ucp7o.mongodb.net/catalogo_perfumes?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
    .then(() => console.log('🔥 ¡CONECTADO EXITOSAMENTE A MONGODB ATLAS!'))
    .catch((err) => {
        console.error('❌ Error crítico de conexión:');
        console.error(err);
    });
// ----------------------------------

app.get('/', (req, res) => {
    res.send('API Perfumes Chile Funcionando 🚀');
});

// Rutas
app.use('/api/perfumes', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 10000; // Render usa el puerto 10000 por defecto
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});