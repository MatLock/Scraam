import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export default class Service {


  constructor(http) {
     this.http = http
     this.proyectos = []
     this.milestoneSeleccionado = {};
     this.http.get("/proyectos").toPromise()
             .then(response => this.proyectos.push(...response.json()))
             .catch(err => console.log(err))
   }

  verProyecto(id) {
    return this.http.get(`/proyectos/${id}`).toPromise()
                    .then(response => response.json())
                    .catch(err => console.log(err))
  }


  crearProyecto(proyecto){
    return this.http.post('/proyectos', JSON.stringify(proyecto),{ headers:{'Content-Type': 'application/json'}})
                    .toPromise()
                      .then(response => {
                        proyecto._id = response;
                        this.proyectos.push(proyecto);})
                      .catch(err => console.log(err));
  }

  crearMilestone(milestone,proyecto){
    return this.http.put(`/proyectos/${proyecto._id}`, JSON.stringify(milestone),{ headers:{'Content-Type': 'application/json'}})
                    .toPromise()
                      .then(response => {
                        milestone._id=response;
                        proyecto.milestones.push(milestone);
                      })
                      .catch(err => console.log(err));
  }

  crearTarea(tarea,milestone){
    return this.http.put(`/milestones/${milestone._id}`, JSON.stringify(tarea),{ headers:{'Content-Type': 'application/json'}})
                    .toPromise()
                      .then(response => {
                        tarea._id = response;
                        milestone.tareas.push(tarea);
                       })
                      .catch(err => console.log(err));
  }

  obtenerTareasDe(milestone){
    this.http.get(`/milestones/${milestone._id}`,{ headers:{'Content-Type': 'application/json'}})
                    .toPromise()
                      .then(response => milestone.tareas = response.json().tareas)
                      .catch(err => console.log(err));
  }

}

Service.parameters = [Http]
