import { Component } from '@angular/core';

@Component({
  selector: 'milestones',
  inputs: [ 'milestones' ],
  providers: [ Service ],
  templateUrl: '../templates/milestones.component.html'
})
export default class MilestoneComponent {

  constructor(service) {
    this.service = service
  }

  onCrearMilestone() {
    // do nothing
  }


}

MilestoneComponent.parameters = [Service]
