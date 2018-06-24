import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuth: boolean;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.watchAuthState();
  }

  watchAuthState() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onLogout(): void {
    this.authService.logoutUser();
  }

}
