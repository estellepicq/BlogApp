import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../../models/post';

import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  post: Post;

  constructor(
    public authService: AuthService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPost();
    this.authService.watchAuthState();
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPostById(id).then((post: Post) => {
      this.post = post;
    });
  }

  onDeletePost(post: Post): void {
    this.postService.removePost(post);
    this.router.navigate(['/posts']);
  }

  onLoveIt(post: Post): void {
    this.postService.onLoveIt(post);
  }

  onHateIt(post: Post): void {
    this.postService.onHateIt(post);
  }

}
