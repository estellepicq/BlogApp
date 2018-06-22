import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[];

  constructor(
    private httpClient: HttpClient
  ) { }

  addPost(title: string, content: string): void {
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
  }

  savePostsToServer() {
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

    getPostsFromServer() {
      return this.httpClient.get<Post[]>('https://blogapp-5c679.firebaseio.com/posts.json');
    }

}
