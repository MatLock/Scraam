import { Component } from '@angular/core';
import { ActivatedRoute,ROUTER_DIRECTIVES } from '@angular/router';


import Service from '../services/services';

@Component({
  selector: 'milestones',
  inputs: [ 'proyecto' ],
  providers: [ Service ],
  directives: [ROUTER_DIRECTIVES],
  template: require('../templates/milestones.component.html')
})
export default class MilestoneComponent {


  constructor(service,route) {
    this.service = service
    this.router = route
  }

  onCrearMilestone() {
    this.router.navigate([],this.proyecto);
  }


}

MilestoneComponent.parameters = [Service,ActivatedRoute]
