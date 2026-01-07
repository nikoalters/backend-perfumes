import express from 'express';
import asyncHandler from 'express-async-handler';
import Comment from '../models/Comment.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// OBTENER TODOS LOS COMENTARIOS (Público)
router.get('/', asyncHandler(async (req, res) => {
  // Traemos los últimos 10 comentarios
  const comments = await Comment.find({}).sort({ createdAt: -1 }).limit(10);
  res.json(comments);
}));

// CREAR UN COMENTARIO (Privado - Solo logueados)
router.post('/', protect, asyncHandler(async (req, res) => {
  const { comentario } = req.body;

  if (!comentario) {
    res.status(400);
    throw new Error('El comentario no puede estar vacío');
  }

  const newComment = await Comment.create({
    user: req.user._id,
    name: req.user.name,
    comentario,
  });

  res.status(201).json(newComment);
}));

export default router;