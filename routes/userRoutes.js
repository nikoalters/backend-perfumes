import express from 'express';
const router = express.Router();
import { 
    authUser, 
    registerUser, 
    getUserProfile,
    toggleWishlist, // <--- Nueva función importada
    getWishlist     // <--- Nueva función importada
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// RUTA 1: Registro de Usuarios (POST /api/users)
router.post('/', registerUser);

// RUTA 2: Login de Usuarios (POST /api/users/login)
router.post('/login', authUser);

// RUTA 3: Perfil del Usuario (GET /api/users/profile) - Protegida
router.route('/profile').get(protect, getUserProfile);

// RUTA 4: Wishlist (POST y GET /api/users/wishlist) - Protegida
// POST: Agrega o quita perfumes
// GET: Obtiene la lista guardada
router.route('/wishlist')
    .post(protect, toggleWishlist)
    .get(protect, getWishlist);

export default router;