import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, { timestamps: true });

const productSchema = mongoose.Schema({
  // Agregamos la referencia al Admin que creó el producto (Buena práctica)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  imagen: { type: String, required: true },
  
  // --- CAMPOS QUE FALTABAN Y AGREGAMOS AHORA ---
  marca: { type: String, required: true, default: 'Genérica' },
  descripcion: { type: String, required: false, default: '' },
  
  // ESTE ES EL QUE ARREGLA TU PROBLEMA DE STOCK 👇
  countInStock: { type: Number, required: true, default: 0 },

  reviews: [reviewSchema],
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
}, { timestamps: true });

// LA SOLUCIÓN: Forzamos a Mongoose a usar la colección 'perfumes'
const Product = mongoose.model('Product', productSchema, 'perfumes');

export default Product;