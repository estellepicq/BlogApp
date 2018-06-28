import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import DataSnapshot = firebase.database.DataSnapshot;

import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[];
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
    let postId = '';
    return new Promise(
      (resolve: Function, reject: Function) => {
        firebase.database().ref('posts').orderByChild('id').equalTo(id).on('child_added', (snapshot) => {
          postId = snapshot.key;
          firebase.database().ref('/posts/' + postId).once('value').then(
            (data: DataSnapshot) => {
              resolve(data.val());
            },
            (error) => {
              reject(error);
            }
          );
        });
    });
  }

  addPost(newPost: Post): void {
    if(this.getPostsLength() === 0) {
      this.posts = [];
    }
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post): void {
    if(post.photo) {
      const storageRef = firebase.storage().refFromURL(post.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
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
    this.savePosts();
    this.emitPosts();
  }

  onHateIt(post: Post): void {
    post.hateIts++;
    this.savePosts();
    this.emitPosts();
  }

  getPostsLength(): number {
    this.getPosts();
    if(this.posts) {
      return this.posts.length;
    } else {
      return 0;
    }
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const timeStamp = Date.now().toString();
        const fileRef = firebase.storage().ref().child('images/' + timeStamp + file.name);
        const upload = fileRef.put(file);
        upload.on('state_changed',
          (snapshot: any) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.log(error);
            reject();
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downloadURL) => {
                resolve(downloadURL);
              }
            );
          }
        );
      }
    );
  }

}
