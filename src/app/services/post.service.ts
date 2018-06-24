import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[];

  constructor(
    private httpClient: HttpClient
  ) { }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>('https://blogapp-5c679.firebaseio.com/posts.json');
  }

  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>('https://blogapp-5c679.firebaseio.com/posts.json');
  }

  addPost(title: string, content: string): void {
    this.getPosts().subscribe(response => {
      this.posts = response;
      const post: Post = {
        id: 0,
        title: '',
        content: '',
        loveIts: 0,
        created_at: new Date()
      };
      post.title = title;
      post.content = content;
      post.id = this.posts[(this.posts.length - 1)].id + 1;
      this.posts.push(post);
    });
  }

  savePostsToServer(): void {
    this.httpClient
      .put('https://blogapp-5c679.firebaseio.com/posts.json', this.posts)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    }

    onLoveIt(post: Post): void {
      post.loveIts++;
    }

    onHateIt(post: Post): void {
      post.loveIts--;
    }

}
