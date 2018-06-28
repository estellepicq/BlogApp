import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: boolean;

  constructor() { }

  registerUser(email: string, password: string): Promise<string> {
    return new Promise(
      (resolve: Function, reject: Function) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  authenticateUser(email: string, password: string): Promise<string> {
    return new Promise(
      (resolve: Function, reject: Function) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  logoutUser(): void {
    firebase.auth().signOut();
    this.isAuth = false;
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

}
