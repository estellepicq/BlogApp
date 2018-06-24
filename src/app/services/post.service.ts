import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/database';
import DataSnapshot = firebase.database.DataSnapshot;

import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[] = [];
  postsSubject = new Subject<Post[]>();

  emitPosts(): void {
    this.postsSubject.next(this.posts);
  }

  savePosts(): void {
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts(): void {
    firebase.database().ref('/posts').on('value', (data: DataSnapshot) => {
      this.posts = data.val();
      this.emitPosts();
    });
  }

  getPostById(id: number): Promise<Post> {
    return new Promise(
      (resolve: Function, reject: Function) => {
        firebase.database().ref('/posts/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  addPost(newPost: Post): void {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post): void {
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if(postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

  onLoveIt(post: Post): void {
    post.loveIts++;
  }

  onHateIt(post: Post): void {
    post.loveIts--;
  }

  getPostsLength(): number {
    this.getPosts();
    return this.posts.length;
  }

    // addPost(title: string, content: string): void {
    //   this.getPosts().subscribe(response => {
    //     this.posts = response;
    //     const post: Post = {
    //       id: 0,
    //       title: '',
    //       content: '',
    //       loveIts: 0,
    //       created_at: new Date()
    //     };
    //     post.title = title;
    //     post.content = content;
    //     post.id = this.posts[(this.posts.length - 1)].id + 1;
    //     this.posts.push(post);
    //   });
    // }

}
