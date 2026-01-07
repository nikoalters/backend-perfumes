import express from 'express';
const router = express.Router();
import { 
    authUser, 
    registerUser, 
    getUserProfile,
    updateUserProfile, // <--- FALTABA ESTO
    toggleWishlist, 
    getWishlist     
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

// RUTA 1: Registro de Usuarios (POST /api/users)
router.post('/', registerUser);

// RUTA 2: Login de Usuarios (POST /api/users/login)
router.post('/login', authUser);

// RUTA 3: Perfil del Usuario (GET y PUT /api/users/profile) - Protegida
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile); // <--- ESTA ES LA LLAVE QUE FALTABA 🔑

// RUTA 4: Wishlist (POST y GET /api/users/wishlist) - Protegida
router.route('/wishlist')
    .post(protect, toggleWishlist)
    .get(protect, getWishlist);

export default router;