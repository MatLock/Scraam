import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

import Service from '../services/services';

@Component({
  selector: 'app-view',
  inputs: ['proyectos'],
  directives: [ROUTER_DIRECTIVES],
  template: require('../templates/app.component.html'),
  queries: {
    childModal: new ViewChild("childModal")
  }
})

export default class AppComponent {

  constructor(service, router) {
		this.service = service
    this.router = router
		this.proyectos = this.service.proyectos
    this.nombreProyecto = ''
	}

	verProyecto(idProyecto){
		  this.service.nuevoMilestoneVisible = false;
      this.router.navigate(['/milestones', idProyecto]);
	}

  showChildModal() {
   this.childModal.show()
 }

  hideChildModal() {
   this.childModal.hide()
 }

  onCrearProyecto() {
    let pr = {nombre: this.nombreProyecto}
    this.service.crearProyecto(pr)
      .then( _ => {
        this.nombreProyecto = ''
        this.childModal.hide()
      })
      .catch(err => console.log(err));
 }

}

AppComponent.parameters = [Service, Router]
