import { Component } from '@angular/core';

import Service from '../services/services';

@Component({
  selector: 'app-view',
  inputs: ['proyectos'],
  providers: [Service],
  template: require('../templates/app.component.html')
})
export default class AppComponent {

	constructor(service) {
		this.service = service
		this.proyectos = this.service.proyectos
    this.proyecto = {}
	}

	verProyecto(idProyecto){
		this.service.verProyecto(idProyecto)
        .then(proyecto => {
          this.proyecto = proyecto
          console.log(proyecto)
        })
        .catch(err => console.log(err))
	}

}

AppComponent.parameters = [Service]
