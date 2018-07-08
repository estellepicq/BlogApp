import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: firebase.User;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(data => {
      this.user = data;
    });
  }

}
