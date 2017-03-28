import { Component } from '@angular/core';

@Component({
  selector: 'post',
  inputs: [ 'data' ],
  template: `<article>
              <header>{{data.title}}</header>
              {{data.content}}
              <footer>por {{data.author}} - {{data.upvotes}}</footer>
              <a [routerLink]="['/noticia', data._id]">VER DETALLE</a>
            </article>`
})
export default class PostComponent {
}