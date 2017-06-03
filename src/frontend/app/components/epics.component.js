import { Component } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES, Router, RouteParams } from '@angular/router';

import Service from '../services/services';

@Component({
  selector: 'epics',
  inputs: ['epics'],
  directives: [ROUTER_DIRECTIVES],
  template: require('../templates/epics.component.html')
})
export default class EpicComponent {

  constructor(service, route, activateRoute) {
    this.service = service
    this.router = route
    this.actRoute = activateRoute
  }

  ngOnInit(){
    debugger;
    //this.epics = epics
  }


}

EpicComponent.parameters = [Service, Router, ActivatedRoute]
