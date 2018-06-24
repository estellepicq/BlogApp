import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
  }

}
