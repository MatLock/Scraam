import mongoose from 'mongoose'
import Milestone from '../models/Milestone.js'


// Mongoose models and schemas
const proyectoSchema = new mongoose.Schema({
  nombre: String,
  milestones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Milestone' }]
})

proyectoSchema.methods.agregarMilestone = function(m) {
  let milestone = new Milestone(m);
  this.milestones.push(milestone);
  return milestone;
}


const Proyecto = mongoose.model('Proyecto', proyectoSchema)

export default Proyecto
