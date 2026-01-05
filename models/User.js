import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    // --- DATOS PERSONALES ---
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    
    // --- PERMISOS ---
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },

    // --- NUEVO: LISTA DE DESEOS ---
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product' // Relacionamos con el modelo de Productos
        }
    ]

}, {
    timestamps: true, // Crea automáticamente createdAt y updatedAt
});

// ============================================================
// MÉTODOS DEL MODELO
// ============================================================

// 1. Comparar contraseñas (Usado en el Login)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// 2. Encriptar contraseña antes de guardar (Usado en Registro/Cambio de clave)
userSchema.pre('save', async function (next) {
    // CORRECCIÓN IMPORTANTE: 
    // Si la contraseña NO se modificó, usamos 'return next()' para salir de la función.
    // Esto evita que intente encriptar de nuevo y cause el error cuando guardamos la wishlist.
    if (!this.isModified('password')) {
        return next(); 
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

export default User;