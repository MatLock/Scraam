import { Component } from '@angular/core';

import Service from '../services/services';

@Component({
  selector: 'milestones',
  inputs: [ 'proyecto' ],
  providers: [ Service ],
  template: require('../templates/milestones.component.html')
})
export default class MilestoneComponent {

  constructor(service) {
    this.service = service
  }

  onCrearMilestone() {
    alert("comming son")
  }


}

MilestoneComponent.parameters = [Service]
