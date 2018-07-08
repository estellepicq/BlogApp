import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterConfirmComponent } from './auth/register-confirm/register-confirm.component';
import { HomeComponent } from './header/home/home.component';
import { ProfileComponent } from './header/profile/profile.component';

import { AuthGuardService } from './services/auth-guard.service';

import { PostListComponent } from './posts/post-list/post-list.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { PostListItemComponent } from './posts/post-list-item/post-list-item.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-confirm', component: RegisterConfirmComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'new', canActivate: [AuthGuardService], component: NewPostComponent }, //User must be logged
  { path: 'post/:id', component: PostListItemComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
