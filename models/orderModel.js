import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  orderItems: [
    {
      // 👇 CAMBIOS AQUÍ: Quitamos 'required' estricto en la imagen
      nombre: { type: String, required: true },
      qty: { type: Number, required: true },
      imagen: { type: String, default: '/vite.svg' }, // Si no tiene foto, usa el logo
      precio: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    },
  ],
  // 👇 AQUÍ ESTÁ LO DE LA DIRECCIÓN QUE YA ARREGLAMOS
  shippingAddress: {
    direccion: { type: String, default: 'Sin dirección' },
    city: { type: String, default: 'Santiago' },
    postalCode: { type: String, default: '0000' },
    country: { type: String, default: 'Chile' },
  },
  paymentMethod: {
    type: String,
    required: true,
    default: 'Transferencia',
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  isCancelled: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;