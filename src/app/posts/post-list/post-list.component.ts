import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../../models/post';

import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe(response => this.posts = response);
  }

  onLoveIt(post: Post): void {
    this.postService.onLoveIt(post);
  }

  onHateIt(post: Post): void {
    this.postService.onHateIt(post);
  }

}
