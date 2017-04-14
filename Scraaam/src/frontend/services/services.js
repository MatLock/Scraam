import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export default class PostService {


  constructor(http) {
     this.http = http
     this.proyectos = []
     this.http.get("/proyectos").toPromise()
             .then(response => this.proyectos.push(...response.json()))
             .catch(err => console.log(err))
   }

   verProyecto(id) {
    return this.http.get(`/proyectos/${id}`).toPromise()
            .then(response => response.json());
  }


}





PostService.parameters = [Http]
