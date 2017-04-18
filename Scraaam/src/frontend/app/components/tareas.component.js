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
  }


}

TareaComponent.parameters = [Service, Router, ActivatedRoute]
