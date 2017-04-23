import mongoose from 'mongoose'
import Milestone from '../models/Milestone.js'
import Epic from '../models/Epic.js'


// Mongoose models and schemas
const proyectoSchema = new mongoose.Schema({
  nombre: String,
  milestones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' }]
})

proyectoSchema.methods.agregarMilestone = function(nombre) {
  let milestone = new Milestone();
  milestone.nombre= nombre;
  this.milestones.push(milestone);
  return milestone;
}


const Proyecto = mongoose.model('Proyecto', proyectoSchema)

export default Proyecto
