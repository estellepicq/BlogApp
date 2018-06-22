import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { PostListComponent } from './post-list/post-list.component';
import { NewPostComponent } from './new-post/new-post.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'new', component: NewPostComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
