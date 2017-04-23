import { Component,EventEmitter,Output } from '@angular/core';
import { ActivatedRoute,ROUTER_DIRECTIVES,Router,RouteParams } from '@angular/router';


import Service from '../services/services';

@Component({
  selector: 'milestones',
  directives: [ROUTER_DIRECTIVES],
  template: require('../templates/milestones.component.html')
})
export default class MilestoneComponent {


  constructor(service,route,activateRoute) {
    this.service = service
    this.router = route
    this.actRoute = activateRoute
    this.proyecto = {}
    //this.milestoneSeleccionada = {epics:[{tareas:[]}]};
    this.nuevoMilestoneVisible =false;
    this.tareasVisible =false;
  }

 ngOnInit(){
   this.actRoute.params.subscribe(params => {
     this.service.verProyecto(params.idProyecto)
           .then(proyecto => this.proyecto = proyecto)
           .catch(err => console.log(err));
      this.nuevoMilestoneVisible = false;
      this.tareasVisible = false;
   });
 }


  onCrearMilestone() {
    this.nuevoMilestoneVisible = true;
    this.tareasVisible = false;
  }

  onVerTareas(m){
    this.tareasVisible=true;
    this.nuevoMilestoneVisible = false;
    this.milestoneSeleccionada = m;
    this.service.obtenerTareasDe(this.milestoneSeleccionada);
  }


}

MilestoneComponent.parameters = [Service,Router,ActivatedRoute]
