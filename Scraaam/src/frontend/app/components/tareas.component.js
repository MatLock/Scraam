import { Component, CORE_DIRECTIVES } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES, Router, RouteParams } from '@angular/router';

import Service from '../services/services';

@Component({
  selector: 'tareas',
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
  template: require('../templates/tareas.component.html')
})
export default class TareaComponent {

  constructor(service, route, activateRoute) {
    this.service = service
    this.router = route
    this.actRoute = activateRoute
    this.milestone = this.service.milestoneSeleccionado
  }

 ngOnInit(){
    this.milestone = {};
    this.actRoute.params.subscribe(params => {
       this.milestone = this.service.milestoneSeleccionado
     });
 }
}

TareaComponent.parameters = [Service, Router, ActivatedRoute]
