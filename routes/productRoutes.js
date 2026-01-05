import express from 'express';
const router = express.Router();

// 1. IMPORTAMOS TODAS LAS FUNCIONES (Incluyendo las nuevas de Admin)
import { 
    getProducts, 
    getProductById, 
    createProductReview, 
    createProduct, // Crear
    deleteProduct, // Borrar
    updateProduct  // Editar
} from '../controllers/productController.js';

// 2. IMPORTAMOS LOS DOS GUARDIANES
import { protect, admin } from '../middleware/authMiddleware.js'; 

// --- RUTAS ---

// RUTA RAIZ (/api/products)
// GET: Todo el mundo ve los productos
// POST: Solo Admin crea productos (Protegido por 'protect' y 'admin')
router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);

// RUTA POR ID (/api/products/:id)
// GET: Todo el mundo ve el detalle
// DELETE: Solo Admin borra
// PUT: Solo Admin edita
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

// RUTA DE RESEÑAS
router.route('/:id/reviews').post(protect, createProductReview);

export default router;