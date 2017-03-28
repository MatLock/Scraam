import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,ROUTER_DIRECTIVES } from '@angular/router';


import PostService from "../services/post.service"


@Component({
  selector: 'postDetail',
  inputs: [ 'post' ],
  providers: [ PostService ],
  directives: [ROUTER_DIRECTIVES],
  template: `<post [data]="post"></post>
<h2>Comentarios:</h2>
<comment *ngFor="let comment of post.comments" [data]="commment"></comment>
<a [routerLink]="['/noticias']">Atras</a>`
})
export default class PostDetailComponent {

	constructor(route, postService) {
    	this.route = route
    	this.postService = postService
  }

  ngOnInit(){
      this.post = {}
      this.route.params.subscribe(params => {
        //cuando algo un parametro cambia
        this.postService.getPost(params.id)
            .then(post => this.post = post)
            .catch(e => console.log(e));
      });
 }
}

PostDetailComponent.parameters = [ ActivatedRoute, PostService];