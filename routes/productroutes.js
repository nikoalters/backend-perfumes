import express from 'express';
const router = express.Router();

// 1. AQUÍ AGREGAMOS 'createProduct' AL IMPORT
import { 
    getProducts, 
    getProductById, 
    createProductReview, 
    createProduct 
} from '../controllers/productController.js';

import { protect } from '../middleware/authMiddleware.js'; 

// 2. AQUÍ AGREGAMOS '.post(createProduct)' PARA PODER CREAR
router.route('/').get(getProducts).post(createProduct);

router.route('/:id').get(getProductById);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;