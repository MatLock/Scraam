import { Component,CORE_DIRECTIVES } from '@angular/core';
import { ActivatedRoute,ROUTER_DIRECTIVES,Router,RouteParams } from '@angular/router';


import Service from '../services/services';

@Component({
  selector: 'milestones',
  directives: [ROUTER_DIRECTIVES,CORE_DIRECTIVES],
  template: require('../templates/milestones.component.html')
})
export default class MilestoneComponent {


  constructor(service,route,activateRoute) {
    this.service = service
    this.router = route
    this.actRoute = activateRoute
    this.service.nuevoMilestoneVisible =false;
    console.log(this.actRoute)
    this.proyecto = this.service.proyectoSeleccionado
    console.log("proyecto seleccionado ->" ,this.service.proyectoSeleccionado.nombre)
  }

 ngOnInit(){
    this.proyecto = {};
    this.service.nuevoMilestoneVisible =false;
    this.actRoute.params.subscribe(params => {
       this.proyecto = this.service.proyectoSeleccionado
     });
 }


  onCrearMilestone() {
    this.service.nuevoMilestoneVisible = true;
  }


}

MilestoneComponent.parameters = [Service,Router,ActivatedRoute]
