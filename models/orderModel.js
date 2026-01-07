import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    // 1. QUIÉN COMPRÓ
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Conectamos con el usuario que ya creamos
    },

    // 2. QUÉ COMPRÓ (Lista de perfumes)
    orderItems: [
      {
        nombre: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        precio: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],

    // 3. DÓNDE SE ENVÍA (Guardamos una foto de la dirección en ese momento)
    shippingAddress: {
      direccion: { type: String, required: true },
      comuna: { type: String, required: true },
    },

    // 4. MONTOS
    itemsPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 }, // Por si cobras envío después
    totalPrice: { type: Number, required: true, default: 0.0 },

    // 5. ESTADOS DEL PEDIDO (Aquí está la lógica de "Yo autorizo")
    
    // ¿Ya pagó? (Por defecto NO, tú lo cambias manual)
    isPaid: {
      type: Boolean,
      required: true,
      default: false, 
    },
    paidAt: {
      type: Date,
    },

    // ¿Ya se envió?
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Guarda fecha y hora de creación automática
  }
);

const Order = mongoose.model('Order', orderSchema);
// ... campos anteriores (isPaid, isDelivered, etc) ...
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    // 👇 AGREGA ESTO AQUÍ AL FINAL
    isCancelled: {
      type: Boolean,
      required: true,
      default: false,
    },
// ...

export default Order;