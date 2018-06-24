import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PostService } from '../../services/post.service';

import { Post } from '../../models/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;
  posts: Post[];

  constructor(
    private postService: PostService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
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
      created_at: new Date()
    };
    this.postService.addPost(newPost);
    this.router.navigate(['/posts']);
  }

}
