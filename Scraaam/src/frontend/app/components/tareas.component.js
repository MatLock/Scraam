import { Component } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES, Router, RouteParams } from '@angular/router';

import Service from '../services/services';

@Component({
  selector: 'tareas',
  inputs: ['milestone'],
  directives: [ROUTER_DIRECTIVES],
  template: require('../templates/tareas.component.html')
})
export default class TareaComponent {

  constructor(service, route, activateRoute) {
    this.service = service
    this.router = route
    this.actRoute = activateRoute
    this.totalTareas = 0;
  }

  contarTareas(evt){
    var totalTareas = 0;
    if(this.milestone){
      this.milestone.epics.forEach(epic => {
          totalTareas += epic.tareas.length;
      });
      this.totalTareas = totalTareas;
    }
  }

  ngOnInit(){
    this.contarTareas();
  }


}

TareaComponent.parameters = [Service, Router, ActivatedRoute]
