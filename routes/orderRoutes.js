import express from 'express';
const router = express.Router();
import { 
    addOrderItems, 
    getOrderById, 
    getMyOrders // <--- Importar nueva función
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// 1. Crear pedido
router.route('/').post(protect, addOrderItems);

// 2. Obtener MIS pedidos (NUEVA RUTA)
// ¡Esta debe ir antes de /:id!
router.route('/myorders').get(protect, getMyOrders); 

// 3. Obtener pedido por ID
router.route('/:id').get(protect, getOrderById);

export default router;