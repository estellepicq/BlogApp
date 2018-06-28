import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Post } from '../../models/post';

import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[];
  postsSubscription: Subscription;

  constructor(
    public authService: AuthService,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPosts();
    this.authService.watchAuthState();
  }

  getPosts() {
    this.postsSubscription = this.postService.postsSubject.subscribe((posts: Post[]) => {
      this.posts = posts;
    });
    this.postService.getPosts();
  }

  onNewPost(): void {
    this.router.navigate(['/new']);
  }

  onViewPost(id: number): void {
    this.router.navigate([`/posts/${id}`]);
  }

  onDeletePost(post: Post): void {
    this.postService.removePost(post);
  }

  onLoveIt(post: Post): void {
    this.postService.onLoveIt(post);
  }

  onHateIt(post: Post): void {
    this.postService.onHateIt(post);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
