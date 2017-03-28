import { Component } from '@angular/core';

import PostService from '../services/post.service';

@Component({
  selector: 'postList',
  providers: [ PostService ],
  template: `<post *ngFor="let item of posts" [data]="item"></post>
			<newPost></newPost>`
})
export default class PostListComponent {
  constructor(postService) {
    this.posts = postService.posts;
  }
}

PostListComponent.parameters = [
  [PostService]
]