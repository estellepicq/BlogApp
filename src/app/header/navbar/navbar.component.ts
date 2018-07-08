import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.logoutUser().then(
      () => {
        this.router.navigate(['/']);
        this.toasterService.pop('success', 'Success', 'You are now logged out');
      },
      (error) => {
        console.log(error);
      }
    );

  }

}
