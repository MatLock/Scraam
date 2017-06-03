import mongoose from 'mongoose'

import Epic from '../models/Epic.js'
import Tarea from '../models/Tarea.js'

// Mongoose models and schemas
const milestoneSchema = new mongoose.Schema({
  nombre: String,
  epics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Epic' }]
})

milestoneSchema.methods.crearEpic = function(descripcion){
  let epic = new Epic();
  epic.descripcion = descripcion;
  return epic;
}



const Milestone = mongoose.model('Milestone', milestoneSchema)

export default Milestone
