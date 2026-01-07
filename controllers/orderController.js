import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';


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
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      totalPrice,
      isPaid: false,
      isDelivered: false
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});


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

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});


const getOrders = asyncHandler(async (req, res) => {
  // Traemos todos y mostramos el ID y Nombre del usuario
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});


const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Pedido no encontrado');
  }
});


// ... (código anterior) ...

// @desc    Marcar pedido como ENVIADO (Delivered)
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Pedido no encontrado');
  }
});

// ... (código anterior) ...

// @desc    Marcar pedido como CANCELADO/RECHAZADO
// @route   PUT /api/orders/:id/cancel
// @access  Private/Admin
const updateOrderToCancelled = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isCancelled = true;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Pedido no encontrado');
  }
});

// ¡AGRÉGALO AL EXPORT!
export { 
    addOrderItems, 
    getOrderById, 
    getMyOrders, 
    getOrders, 
    updateOrderToPaid, 
    updateOrderToDelivered,
    updateOrderToCancelled // <--- NUEVO
};