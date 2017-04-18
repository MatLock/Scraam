import { Component } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';

import Service from '../services/services';

@Component({
  selector: 'nuevaTarea',
  inputs: [ 'milestone' ],
  directives: [ROUTER_DIRECTIVES],
  template: require('../templates/nuevaTarea.component.html')
})
export default class NuevaTareaComponent {

  constructor(service ,route) {
    this.route = route
    this.nombre = '';
    this.service = service
    this.tarea = {};
  }

  onCrearMilestone() {
    this.service.crearMilestone(this.tarea);
    this.tarea = {};
  }
}

NuevaTareaComponent.parameters = [Service, ActivatedRoute]
