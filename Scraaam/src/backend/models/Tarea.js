import mongoose from 'mongoose'


// Mongoose models and schemas
const tareaSchema = new mongoose.Schema({
  descripcion: String,
  fechaCreacion: { type: Date, default: Date.now }
});

const Tarea = mongoose.model('Tarea', tareaSchema);

export default Tarea
