import asyncHandler from 'express-async-handler'; // Ahora que ya lo tienes instalado, úsalo ;)
import Order from '../models/orderModel.js';

// @desc    Crear un nuevo pedido
// @route   POST /api/orders
// @access  Private (Solo usuarios registrados)
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No hay artículos en el pedido');
    return;
  } else {
    // Crear el objeto de pedido en memoria
    const order = new Order({
      user: req.user._id, // Asociamos el pedido al usuario logueado
      orderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      totalPrice,
      isPaid: false, // Nace pendiente
      isDelivered: false
    });

    // Guardar en la Base de Datos
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Obtener pedido por ID (Para ver detalles después)
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Pedido no encontrado');
  }
});

// ... (código anterior) ...

// @desc    Obtener pedidos del usuario logueado
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  // Busca pedidos donde el campo 'user' coincida con el ID del usuario logueado
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// IMPORTANTE: Agrégalo al export
export { addOrderItems, getOrderById, getMyOrders };