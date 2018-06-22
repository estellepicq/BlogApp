import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { PostService } from '../post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm): void {
    const title = form.value['title'];
    const content = form.value['content'];
    this.postService.addPost(title, content);
    this.router.navigate(['/']);
}

}
