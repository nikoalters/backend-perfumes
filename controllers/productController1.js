import Product from '../models/Product.js';

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

// Crear reseña
const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
      const product = await Product.findById(req.params.id);

      if (product) {
        // Verificar si el usuario ya opinó (opcional, por ahora lo dejamos simple)
        const review = {
          name: req.user.name,
          rating: Number(rating),
          comment,
          user: req.user._id,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        // Calcular promedio
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Reseña agregada' });
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
  } catch (error) {
      res.status(400).json({ message: 'Error al crear la reseña' });
  }
};

// ... tus otras funciones arriba ...

// Función para crear un perfume manualmente
const createProduct = async (req, res) => {
    const { nombre, precio, categoria, imagen } = req.body;

    const product = new Product({
        nombre,
        precio,
        categoria,
        imagen
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

// ¡No olvides agregarlo al export!
export { getProducts, getProductById, createProductReview, createProduct };

