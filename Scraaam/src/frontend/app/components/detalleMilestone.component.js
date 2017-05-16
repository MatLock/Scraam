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
  }

  ngOnInit(){
    //this.milestone = this.service.milestone
  //  this.epics = this.milestone.epics
  }

  contarTareas(evt){
    debugger;
    var totalTareas = 0;
    if(this.milestone){
      this.milestone.epics.forEach(epic => {
          totalTareas += epic.tareas.length;
      });
      this.totalTareas = totalTareas;
    }
  }

  onCrearEpic() {
   this.service.crearEpic(this.epic, this.milestone)
   this.epic = {}
 }

}

DetalleMilestoneComponent.parameters = [Service, Router, ActivatedRoute]
