import { Component } from '@angular/core';
import { ActivatedRoute,ROUTER_DIRECTIVES,Router } from '@angular/router';

import Service from '../services/services';

@Component({
  selector: 'app-view',
  inputs: ['proyectos'],
  directives: [ROUTER_DIRECTIVES],
  template: require('../templates/app.component.html')
})

export default class AppComponent {

  constructor(service,router) {
		this.service = service
    this.router = router
		this.proyectos = this.service.proyectos
    this.proyecto = {}
	}

	verProyecto(idProyecto){
		  this.service.nuevoMilestoneVisible = false;
      this.router.navigate(['/milestones',idProyecto]);
	}

}

AppComponent.parameters = [Service,Router]
