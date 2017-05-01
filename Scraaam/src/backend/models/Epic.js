import mongoose from 'mongoose'

import Tarea from '../models/Tarea.js'

// Mongoose models and schemas
const epicSchema = new mongoose.Schema({
  descripcion: String,
  comentarios: [String],
  tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tarea' }]
})

epicSchema.methods.agregarComentario = function(c) {
  this.comentarios.push(c);
}

epicSchema.methods.agregarTarea = function(t) {
  let tarea = new Tarea(t);
  this.tareas.push(tarea);
  return tarea;
}


const Epic = mongoose.model('Epic', epicSchema)

export default Epic
