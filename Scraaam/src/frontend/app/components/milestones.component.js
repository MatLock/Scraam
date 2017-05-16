import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES, Router, RouteParams } from '@angular/router';

import Service from '../services/services';

@Component({
  selector: 'milestones',
  directives: [ROUTER_DIRECTIVES],
  outputs : ['evento'],
  template: require('../templates/milestones.component.html')
})
export default class MilestoneComponent {

  constructor(service, route, activateRoute) {
    this.service = service
    this.router = route
    this.actRoute = activateRoute
    this.proyecto = {}
    this.detallesMilestone = false;
    this.nombre = ''
    this.milestone = {}
  }

  ngOnInit(){
   this.actRoute.params.subscribe(params => {
     this.service.verProyecto(params.idProyecto)
           .then(proyecto => this.proyecto = proyecto)
           .catch(err => console.log(err));
      this.detallesMilestone = false;
   });
 }

  onCrearMilestone() {
   this.service.crearMilestone(this.milestone, this.proyecto)
   this.milestone = {}
   this.detallesMilestone = false;
 }

  onVerDetalles(m){
    this.service.obtenerDetallesDe(m)
    .then(response => {
      this.milestoneSeleccionada = response.json();
      this.detallesMilestone = true;
    })
    .catch(err => console.log(err));
  }

}

MilestoneComponent.parameters = [Service, Router, ActivatedRoute]
