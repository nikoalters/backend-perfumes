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

// 2. Encriptar contraseña antes de guardar (VERSIÓN CORREGIDA SIN 'next')
// Al usar async/await, Mongoose moderno ya no necesita que llamemos a 'next()'.
// Simplemente dejamos que la función termine o usamos return.
userSchema.pre('save', async function () { 
    
    // Si la contraseña NO se modificó (ej: solo estamos guardando un like),
    // salimos de la función inmediatamente con un return simple.
    if (!this.isModified('password')) {
        return; 
    }

    // Si la contraseña cambió, la encriptamos.
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    // Fin de la función (Mongoose asume que todo salió bien)
});

const User = mongoose.model('User', userSchema);

export default User;