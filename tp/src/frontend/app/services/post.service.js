import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export default class PostService {

   constructor(http) {
      this.http = http
      this.posts = []
      this.http.get("/noticias").toPromise()
              .then(response => this.posts.push(...response.json()))
              .catch(err => console.log(err))
    }

     getPost(id) {
      return this.http.get(`/noticias/${id}`).toPromise()
              .then(response => response.json());
    }

    create(post) {
      this.http.post("/noticias", JSON.stringify(post), { headers:{'Content-Type': 'application/json'}})
              .toPromise()
              .then(response => this.posts.push(post))
              .catch(err => console.log(err))
    }
}

PostService.parameters = [Http]
   