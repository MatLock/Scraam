import mongoose from 'mongoose'

import Tarea from '../models/Tarea.js'

// Mongoose models and schemas
const epicSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  comentarios: [String],
  tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tarea' }]
})

epicSchema.methods.agregarComentario = function(c) {
  this.comentarios.push(comentario);
}

epicSchema.methods.agregarTarea = function(t) {
  let tarea = new Tarea(t);
  this.tareas.push(tarea);
  return tarea;
}

epicSchema.methods.agregarComentario = function(d) {
  this.comentarios.push(d);
}


const Epic = mongoose.model('Epic', epicSchema)

export default Epic
