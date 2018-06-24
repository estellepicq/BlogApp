import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { Post } from '../../models/post';

import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  post: Post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPost();
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPostById(id).then((post: Post) => {
      this.post = post;
    });
  }

  onLoveIt(post: Post): void {
    this.postService.onLoveIt(post);
  }

  onHateIt(post: Post): void {
    this.postService.onHateIt(post);
  }

}
