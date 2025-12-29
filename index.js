import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a Mongo
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('🔥 Conectado a la Base de Datos'))
    .catch((err) => console.error('❌ Error de conexión:', err));

app.get('/', (req, res) => {
    res.send('API Perfumes Chile Funcionando 🚀');
});

// Rutas
app.use('/api/perfumes', productRoutes); // Tus perfumes estarán en /api/perfumes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});