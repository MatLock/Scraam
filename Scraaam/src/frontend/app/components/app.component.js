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
	}

	verProyecto(idProyecto){
		console.log(idProyecto)
		var x = this.service.verProyecto(idProyecto)	
		debugger;
		console.log(x);
	} 

}

AppComponent.parameters = [Service]