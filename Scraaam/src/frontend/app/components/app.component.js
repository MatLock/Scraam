import { Component, ViewChild } from '@angular/core';

import Service from '../services/services';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view',
  inputs: ['proyectos'],
  providers: [Service],
  template: require('../templates/app.component.html')
  //directives: [ModalDirective]
})

export default class AppComponent {
  @ViewChild('childModal') childModal;
  //@ViewChild('childModal')childModal

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

  crearProyecto() {
    this.childModal.show();
  }

}

AppComponent.parameters = [Service]
