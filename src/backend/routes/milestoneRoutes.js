import express from 'express'

import Milestone from '../models/Milestone.js'
import Epic from '../models/Epic.js'
import Tarea from '../models/Tarea.js'

let milestoneRouter = express.Router()

// MIDDLEWARE DE MILESTONES
milestoneRouter.param('milestone', (req, res, next, value) => {
  Milestone.findById(value)
    .populate({
        path:'epics',
        model:'Epic',
        populate:{
          path:'tareas',
          model:'Tarea'
        }
    })
    .then(milestone => {
      if (! milestone ) {
        throw new Error(`Milestone no encontrado ${value}`);
      }
      milestone.epics.forEach(epic => !epic.tareas ? epic.tareas = [] : epic);
      req.milestone = milestone;
      console.log(req.milestone.epics);
      next();
    })
    .catch(next);
});

milestoneRouter.get('/milestones/:milestone', (req, res, next) => {
     res.json(req.milestone)
});

milestoneRouter.put('/milestones/:milestone/:idEpic', (req, res, next) => {

    const milestone = req.milestone;
    const tarea = new Tarea(req.body);
    let epic = milestone.epics.filter(e => e._id == req.params.idEpic)[0]
    console.log(epic)

    tarea.save()
      .then( _ => {
          epic.tareas.push(tarea)
          return epic.save()
        })
        .then( _ => milestone.save())
        .then( _ => res.json(tarea._id))
        .catch(next);
});

milestoneRouter.put('/epic/:milestone', (req, res, next) => {

    const milestone = req.milestone;
    const epic = new Epic(req.body);

    epic.save()
      .then( _ => {
        milestone.epics.push(epic)
        return milestone.save()
      })
      .then( _ => res.json(epic))
      .catch(next);

});

milestoneRouter.post('/milestones/:milestone/:descripcion', (req, res, next) => {

    const milestone = req.milestone;
    const epicModificada = milestone.editarComentario(req.params.descripcion);
    epicModificada.save()
    res.end();
});

export default milestoneRouter
