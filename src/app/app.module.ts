import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './header/home/home.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

import { AppRoutingModule } from './app-routing.module';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostListItemComponent } from './posts/post-list-item/post-list-item.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { PostService } from './services/post.service';
import { RegisterConfirmComponent } from './auth/register-confirm/register-confirm.component';
import { ProfileComponent } from './header/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PostListComponent,
    PostListItemComponent,
    NewPostComponent,
    RegisterConfirmComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ToasterModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    PostService,
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
