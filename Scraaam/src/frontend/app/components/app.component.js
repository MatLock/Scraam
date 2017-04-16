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
		this.service.verProyecto(idProyecto)
        .then(proyecto => {
          this.proyecto = proyecto
          this.service.nuevoMilestoneVisible = false;
          this.service.proyectoSeleccionado = this.proyecto;
          console.log(this.service.proyectoSeleccionado);
          // PREGUNTAR COMO VERGA PASAR UN OBJECTO COMO PARAMETRO A UNA URL,
          this.router.navigate(['/milestones',this.service.proyectoSeleccionado._id]);
        })
        .catch(err => console.log(err))
	}

}

AppComponent.parameters = [Service,Router]
