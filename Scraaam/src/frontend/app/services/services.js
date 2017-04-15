import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export default class Service {


  constructor(http) {
     this.http = http
     this.proyectos = []
     this.http.get("/proyectos").toPromise()
             .then(response => this.proyectos.push(...response.json()))
             .catch(err => console.log(err))
   }

   /*
   verProyecto(id) {
    let proyecto = {};
    this.http.get(`/proyectos/${id}`)
            .map(response =>response.json()).subscribe(data => proyecto = data);
    return proyecto;
  }*/

  /*verProyecto(id) {
    let x = undefined;
    this.http.get(`/proyectos/${id}`).toPromise()
                    .then(response => response.json())
                    .catch(err => console.log(err))
                        .then(proyecto => {
                          x = proyecto
                          console.log(x);
                        })
                        .catch( err => console.log(err));
    return x;
  }*/

  verProyecto(id) {
    return this.http.get(`/proyectos/${id}`).toPromise()
                    .then(response => response.json())
                    .catch(err => console.log(err))
  }                  

}





Service.parameters = [Http]
