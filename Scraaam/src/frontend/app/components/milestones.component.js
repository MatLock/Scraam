import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES, Router, RouteParams } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

import Service from '../services/services';

@Component({
  selector: 'milestones',
  directives: [ROUTER_DIRECTIVES],
  outputs : ['evento'],
  template: require('../templates/milestones.component.html'),
  queries: {
    childModal: new ViewChild("childModal")
  }
})
export default class MilestoneComponent {

  constructor(service,route,activateRoute) {
    this.service = service
    this.router = route
    this.actRoute = activateRoute
    this.proyecto = {}
    //this.milestoneSeleccionada = {epics:[{tareas:[]}]};
    this.tareasVisible =false;
    this.nombre = ''
    this.milestone = {}
  }

  ngOnInit(){
   this.actRoute.params.subscribe(params => {
     this.service.verProyecto(params.idProyecto)
           .then(proyecto => this.proyecto = proyecto)
           .catch(err => console.log(err));
      this.tareasVisible = false;
   });
 }

  onCrearMilestone() {
   this.service.crearMilestone(this.milestone, this.proyecto)
   this.milestone = {}
   this.childModal.hide()
   this.tareasVisible = false;
 }


  onVerTareas(m){
    this.tareasVisible = true;
    this.milestoneSeleccionada = m;
    this.service.obtenerTareasDe(this.milestoneSeleccionada);
  }

  showChildModal() {
    this.childModal.show()
  }

  hideChildModal() {
    this.childModal.hide()
  }

}

MilestoneComponent.parameters = [Service, Router, ActivatedRoute]
