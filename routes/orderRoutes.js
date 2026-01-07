import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,          // <--- Importar
  updateOrderToPaid   // <--- Importar
} from '../controllers/orderController.js';

// Importamos 'protect' y 'admin' desde tu archivo authMiddleware.js
import { protect, admin } from '../middleware/authMiddleware.js'; 

// 1. RUTA RAIZ: /api/orders
// POST: Cliente crea pedido
// GET: Admin ve TODOS los pedidos (protect + admin)
router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders); 

// 2. RUTA MIS PEDIDOS (Cliente ve sus compras)
router.route('/myorders').get(protect, getMyOrders);

// 3. RUTA ID (Ver detalle de un pedido)
router.route('/:id').get(protect, getOrderById);

// 4. RUTA PAGAR (Admin aprueba el pago)
router.route('/:id/pay').put(protect, admin, updateOrderToPaid);

export default router;