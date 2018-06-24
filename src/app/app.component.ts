import { Component } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    const config = {
    apiKey: "AIzaSyBMVhkrZj_9zrzpegDH5Dgy_G4CEvBJ1wY",
    authDomain: "blogapp-5c679.firebaseapp.com",
    databaseURL: "https://blogapp-5c679.firebaseio.com",
    projectId: "blogapp-5c679",
    storageBucket: "blogapp-5c679.appspot.com",
    messagingSenderId: "724646466363"
};
firebase.initializeApp(config);
  }
}
