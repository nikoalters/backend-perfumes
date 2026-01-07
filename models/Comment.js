import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Vinculado al usuario que comenta
  },
  name: {
    type: String,
    required: true, 
  },
  comentario: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Para saber cuándo escribió
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;