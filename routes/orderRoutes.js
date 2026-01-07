import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// RUTA RAIZ: /api/orders
// POST: Crear pedido (Protegido)
router.route('/').post(protect, addOrderItems);

// RUTA ID: /api/orders/:id
// GET: Ver un pedido específico (Protegido)
router.route('/:id').get(protect, getOrderById);

export default router;