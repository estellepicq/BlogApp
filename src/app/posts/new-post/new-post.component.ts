import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { PostService } from '../../services/post.service';

import { Post } from '../../models/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit, OnDestroy {

  postForm: FormGroup;
  posts: Post[];
  postsSubscription: Subscription;
  fileIsUploading: boolean = false;
  fileUrl: string;
  fileUploaded: boolean = false;

  constructor(
    private postService: PostService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.getPosts();
  }

  initForm(): void {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSavePost(): void {
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;
    const id = this.postService.getPostsLength();
    const newPost = {
      id: id,
      title: title,
      content: content,
      loveIts: 0,
      hateIts: 0,
      created_at: Date(),
      photo: this.fileUrl ? this.fileUrl : ''
    };
    this.postService.addPost(newPost);
    this.router.navigate(['/posts']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.postService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  getPosts() {
    this.postsSubscription = this.postService.postsSubject.subscribe((posts: Post[]) => {
      this.posts = posts;
    });
    this.postService.getPosts();
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
