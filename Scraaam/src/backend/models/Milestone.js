import mongoose from 'mongoose'

import Epic from '../models/Epic.js'
import Tarea from '../models/Tarea.js'

// Mongoose models and schemas
const milestoneSchema = new mongoose.Schema({
  nombre: String,
  epics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Epic' }]
})

milestoneSchema.methods.agregarComentario = function(comentario) {
  this.epics[0].push(comentario);
  return this.epics[0];
}

milestoneSchema.methods.agregarEpic = function(descripcion){
  let epic = new Epic();
  epic.descripcion = descripcion;
  return epic;
}



const Milestone = mongoose.model('Milestone', milestoneSchema)

export default Milestone
