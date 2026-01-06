import Product from '../models/Product.js';

// ============================================================
// FUNCIONES PÚBLICAS (Cualquiera puede verlas)
// ============================================================

// Obtener todos los perfumes
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar productos' });
    }
};

// Obtener un perfume por ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(404).json({ message: 'Error buscando el producto' });
    }
};

// ============================================================
// FUNCIONES DE USUARIO REGISTRADO
// ============================================================

// Crear reseña
const createProductReview = async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            // Verificar si ya opinó (opcional, aquí permitimos varias)
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;

            await product.save();
            res.status(201).json({ message: 'Reseña agregada' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la reseña' });
    }
};

// ============================================================
// FUNCIONES DE ADMINISTRADOR
// ============================================================

// @desc    Borrar un producto
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await Product.deleteOne({ _id: product._id });
            res.json({ message: 'Producto eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
};

// @desc    Crear un producto
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const { nombre, precio, categoria, imagen, descripcion, marca, countInStock } = req.body;

        const product = new Product({
            user: req.user._id, // Asociamos al admin que lo crea
            nombre,
            precio,
            categoria,
            imagen,
            // Valores por defecto seguros
            descripcion: descripcion || "Perfume original garantizado.",
            marca: marca || "Genérica",
            countInStock: countInStock || 0
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: 'Datos de producto inválidos: ' + error.message });
    }
};

// @desc    Actualizar un producto
// @route   PUT /api/products/:id
// @access  Private/Admin
// @desc    Actualizar un producto
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    const { nombre, precio, descripcion, imagen, marca, categoria, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.nombre = nombre || product.nombre;
        product.precio = precio || product.precio;
        product.categoria = categoria || product.categoria;
        product.imagen = imagen || product.imagen;
        
        // Relleno de datos antiguos (Marca y Descripción)
        product.marca = marca || product.marca || "Genérica";
        product.descripcion = descripcion || product.descripcion || "Descripción no disponible";

        // Actualización de Stock
        product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;

        // --- CORRECCIÓN FINAL: ASIGNAR DUEÑO A HUÉRFANOS ---
        // Si el producto no tiene usuario (user), le ponemos tu ID de Admin (req.user._id)
        if (!product.user) {
            product.user = req.user._id;
        }

        try {
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } catch (error) {
            console.error("Error al guardar:", error.message);
            // Esto nos mostrará el error exacto en la alerta si falla algo más
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(404);
        throw new Error('Producto no encontrado');
    }
};

// --- FUNCIÓN DE SEMILLA (Carga masiva inicial) ---
const seedProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        const perfumes = []; // Aquí pegarás tus datos si los necesitas de nuevo
        const createdProducts = await Product.insertMany(perfumes);
        res.json({ message: "¡Carga exitosa!", count: createdProducts.length });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error cargando datos" });
    }
};

// ============================================================
// EXPORTAR TODO
// ============================================================
export {
    getProducts,
    getProductById,
    createProductReview,
    createProduct,
    deleteProduct,
    updateProduct,
    seedProducts
};