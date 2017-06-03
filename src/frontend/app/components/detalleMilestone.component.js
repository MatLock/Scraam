import { Component } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES, Router, RouteParams } from '@angular/router';

import Service from '../services/services';

@Component({
  selector: 'detalleMilestone',
  inputs: ['milestone'],
  directives: [ROUTER_DIRECTIVES],
  template: require('../templates/detalleMilestone.component.html')
})
export default class DetalleMilestoneComponent {

  constructor(service, route, activateRoute) {
    this.service = service
    this.router = route
    this.actRoute = activateRoute
    this.totalTareas = 0
    this.totalEpics = 0
    this.epic = {}
    this.epicSeleccionada = null;
    this.epicConMilestone = null;
  }

  ngOnInit(){
    //this.milestone = this.service.milestone
  //  this.epics = this.milestone.epics
  }

  contarTareas = () => {
      var totalTareas = 0;
      if(this.milestone){
        this.milestone.epics.forEach(epic => {
          totalTareas += epic.tareas.length;
        });
        this.totalTareas = totalTareas;
        this.totalEpics = this.milestone.epics.length;
      }
  }

  onCrearEpic() {
   this.service.crearEpic(this.epic, this.milestone)
   this.contarTareas();
   this.epic = {}
 }

 onVerDetalles(epic){
   this.epicSeleccionada = epic
   this.epicConMilestone = {epic:this.epicSeleccionada,milestone:this.milestone}
 }

}

DetalleMilestoneComponent.parameters = [Service, Router, ActivatedRoute]
