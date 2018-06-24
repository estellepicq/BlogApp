import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve: Function, reject: Function) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if(user) {
              resolve(true);
            } else {
              this.router.navigate(['/login']);
              resolve(false);
            }
          }
        );
      }
    );
  }

}
