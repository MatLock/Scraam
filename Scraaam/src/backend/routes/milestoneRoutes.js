import express from 'express'

import Milestone from '../models/Milestone.js'

let milestoneRouter = express.Router()

// MIDDLEWARE DE MILESTONES
milestoneRouter.param('milestone', (req, res, next, value) => {
  Milestone.findById(value)
    .populate("tareas")
    .then(milestone => {
      if (! milestone ) {
        throw new Error(`Milestone no encontrado ${value}`);
      }
      req.milestone = milestone;
      next();
    })
    .catch(next);
});


milestoneRouter.put('/milestones/:milestone/:comentario', (req, res, next) => {
    const milestone = req.milestone;
    milestone.agregarComentario(req.params.comentario);
    milestone.save()
      .then(res.json(milestone.id))
      .catch(next);
});

milestoneRouter.put('/milestones/:milestone/:tarea', (req, res, next) => {

    const milestone = req.milestone;
    const tarea = milestone.agregarTarea(req.body);

    tarea.save()
      .then( _ => {
        milestone.save()
          .then( _ => res.json(tarea.id))
          .catch(next);
      })
      .catch(next);
});

milestoneRouter.post('/milestones/:milestone/:descripcion', (req, res, next) => {

    const milestone = req.milestone;
    milestone.editarComentario(req.params.descripcion);
    milestone.save();
    res.end();
});

export default milestoneRouter
