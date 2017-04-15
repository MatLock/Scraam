import { Component } from '@angular/core';
import { ActivatedRoute,ROUTER_DIRECTIVES } from '@angular/router';


import Service from '../services/services';

@Component({
  selector: 'nuevoMilestone',
  inputs: [ 'proyecto' ],
  providers: [ Service ],
  directives: [ROUTER_DIRECTIVES],
  template: require('../templates/nuevoMilestone.component.html')
})
export default class NuevoMilestoneComponent {


  constructor(service,route) {
    this.route = route
    this.nombre = '';
    this.service = service
    this.milestone = {};
  }

  onCrearMilestone() {
    alert("comming son")
  }


}

NuevoMilestoneComponent.parameters = [Service,ActivatedRoute]