require('dotenv').config(); // 1. Cargar las variables secretas
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// 2. Usamos la variable secreta en lugar del texto fijo
const url = process.env.MONGO_URL;

mongoose.connect(url)
    .then(() => console.log('🔥 Conectado a la Base de Datos en la Nube'))
    .catch((err) => console.error('❌ Error de conexión:', err));

const perfumeSchema = new mongoose.Schema({
    id: Number,
    nombre: String,
    precio: Number,
    categoria: String,
    imagen: String
});

const Perfume = mongoose.model('Perfume', perfumeSchema);

app.get('/', (req, res) => {
    res.send('¡Hola! El servidor de Perfumes Chile está vivo 🚀');
});

app.get('/perfumes', async (req, res) => {
    try {
        const perfumes = await Perfume.find();
        res.json(perfumes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener perfumes' });
    }
});

// Usamos el puerto del sistema o el 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});