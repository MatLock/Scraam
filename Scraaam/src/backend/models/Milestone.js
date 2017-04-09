import mongoose from 'mongoose'

import Tarea from '../models/Tarea.js'

// Mongoose models and schemas
const milestoneSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  comentarios: [String],
  tareas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tarea' }]
})

milestoneSchema.methods.agregarComentario = function(c) {
  let comentario = new Comentario(m);
  this.comentarios.push(comentario);
}

milestoneSchema.methods.agregarTarea = function(t) {
  let tarea = new Tarea(t);
  this.tareas.push(tarea);
  return tarea;
}

milestoneSchema.methods.editarComentario = function(d) {
  this.descripcion = d;
}


const Milestone = mongoose.model('Milestone', milestoneSchema)

export default Milestone
