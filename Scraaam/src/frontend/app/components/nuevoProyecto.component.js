import { Component } from '@angular/core';
import { ActivatedRoute,ROUTER_DIRECTIVES,Router } from '@angular/router';


import Service from '../services/services';

@Component({
  selector: 'nuevoProyecto',
  providers: [ Service ],
  directives: [ROUTER_DIRECTIVES],
  template: require('../templates/nuevoProyecto.component.html')
})
export default class NuevoProyectoComponent {


  constructor(service,route) {
    this.route = route
    this.service = service
    this.nombre = '';
  }

  onCrearProyecto() {
    let pr = {nombre: this.nombre}
    this.service.crearProyecto(pr)
        .then(idPr => {
          pr._id=idPr
          this.service.agregarProyecto(pr)
          this.route.navigate([''])
        })
        .catch(err => console.log(err));
  }


}

NuevoProyectoComponent.parameters = [Service,Router]
