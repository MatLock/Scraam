import express from 'express'

import Proyecto from '../models/Proyecto.js'
import Epic from '../models/Epic.js'

let proyectoRouter = express.Router()

// MIDDLEWARE DE PROYECTO
proyectoRouter.param('proyecto', (req, res, next, value) => {
  Proyecto.findById(value)
    .populate('milestones')
    .then(proyecto => {
      if (! proyecto ) {
        throw new Error(`Proyecto no encontrado ${value}`);
      }
      req.proyecto = proyecto;
      next();
    })
    .catch(next);
});

proyectoRouter.get('/proyectos', (req, res, next) => {
  const query = Proyecto.find();
  query.select('-milestones');
  query.exec((err,proyectos) => {
    if (!err) {
          res.send(proyectos);
    }else {
          res.send({ status: '500 Server error' });
    }});
});

proyectoRouter.post('/proyectos', (req, res, next) => {
  const proyecto = new Proyecto(req.body);

  proyecto.save()
    .then(pr => res.json(pr.id))
    .catch(next);
});

proyectoRouter.get('/proyectos/:proyecto', (req, res, next) => {
  	res.json(req.proyecto);
});


proyectoRouter.put('/proyectos/:proyecto', (req, res, next) => {
    const proyecto = req.proyecto;
    const milestone = proyecto.agregarMilestone(req.body.nombre);

    milestone.save()
          .then( _ => {
            proyecto.save()
              .then( _ => res.json(milestone.id))
              .catch(next);
              })
          .catch(next)
});

export default proyectoRouter
