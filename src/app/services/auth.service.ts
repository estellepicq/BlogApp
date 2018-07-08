import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import { auth } from 'firebase';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  registerUser(email: string, password: string): Promise<string> {
    return new Promise(
      (resolve: Function, reject: Function) => {
        this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
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

  sendSignInLinkToEmail(email: string, actionCodeSettings: any): Promise<string> {
    return new Promise(
      (resolve: Function, reject: Function) => {
        this.afAuth.auth.sendSignInLinkToEmail(email, actionCodeSettings).then(
          () => {
            window.localStorage.setItem('emailForSignIn', email);
            resolve();
          }),
          (error) => {
            reject(error);
          }
        }
      );
  }

  completingRegister(): Promise<string> {
    return new Promise(
      (resolve: Function, reject: Function) => {
        if (this.afAuth.auth.isSignInWithEmailLink(window.location.href)) {
          let email = window.localStorage.getItem('emailForSignIn');
          if (!email) {
            email = window.prompt('Please provide your email for confirmation');
          }
          this.afAuth.auth.signInWithEmailLink(email, window.location.href).then(
            (result) => {
              window.localStorage.removeItem('emailForSignIn');
              resolve();
            }),
            (error) => {
              reject(error);
            }
          }
        }
      );
  }

  updatePassword(password: string): Promise<string> {
    let user = firebase.auth().currentUser;

    return new Promise(
      (resolve: Function, reject: Function) => {
        user.updatePassword(password).then(
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

  sendPasswordResetEmail(email: string): Promise<string> {
    return new Promise(
      (resolve: Function, reject: Function) => {
        firebase.auth().sendPasswordResetEmail(email).then(
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

  loginWithEmail(email: string, password: string): Promise<string> {
    return new Promise(
      (resolve: Function, reject: Function) => {
        this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
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

  loginWithFacebook(): Promise<string> {
    return new Promise(
      (resolve: Function, reject: Function) => {
        this.afAuth.auth.signInWithPopup(
          new firebase.auth.FacebookAuthProvider()
        ).then(
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

  loginWithGoogle(): Promise<string> {
    return new Promise(
      (resolve: Function, reject: Function) => {
        this.afAuth.auth.signInWithPopup(
          new firebase.auth.GoogleAuthProvider()
        ).then(
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

  getUser(): Observable<firebase.User> {
    return this.afAuth.user;
  }

  logoutUser(): Promise<string> {
    return new Promise(
      (resolve: Function, reject: Function) => {
        this.afAuth.auth.signOut().then(
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

}
