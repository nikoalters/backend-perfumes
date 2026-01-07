import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// 1. LOGIN DE USUARIO
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Correo o contraseña inválidos' });
    }
};

// 2. REGISTRAR USUARIO NUEVO
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
};

// 3. PERFIL DE USUARIO
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

// 4. AGREGAR O QUITAR DE FAVORITOS
const toggleWishlist = async (req, res) => {
    const { productId } = req.body;
    
    // Buscamos al usuario actual
    const user = await User.findById(req.user._id);
  
    if (user) {
      // Verificamos si el perfume YA está en su lista
      const isAdded = user.wishlist.includes(productId);
  
      if (isAdded) {
        // Si existe -> Lo sacamos (pull)
        user.wishlist.pull(productId);
        await user.save();
        res.json({ message: "Producto eliminado de favoritos", wishlist: user.wishlist });
      } else {
        // Si NO existe -> Lo agregamos (push)
        user.wishlist.push(productId);
        await user.save();
        res.json({ message: "Producto agregado a favoritos", wishlist: user.wishlist });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    // --- AQUÍ GUARDAMOS LA DIRECCIÓN ---
    user.direccion = req.body.direccion || user.direccion;
    user.comuna = req.body.comuna || user.comuna;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      direccion: updatedUser.direccion, // Devolvemos el dato actualizado
      comuna: updatedUser.comuna,       // Devolvemos el dato actualizado
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
};
// 5. OBTENER LA LISTA DE FAVORITOS
const getWishlist = async (req, res) => {
    // .populate('wishlist') rellena los datos del perfume automáticamente
    const user = await User.findById(req.user._id).populate('wishlist');
  
    if (user) {
        res.json(user.wishlist);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
};

// IMPORTANTE: Exportar TODAS las funciones
export { 
    authUser, 
    registerUser, 
    getUserProfile,
    toggleWishlist, // Nueva
    getWishlist     // Nueva
};