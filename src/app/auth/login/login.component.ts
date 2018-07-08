import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)]]
    });
  }

  onSubmit(): void {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.authService.loginWithEmail(email, password).then(
      () => {
        this.toasterService.pop('success', 'Success', 'You are now logged in');
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  loginWithFacebook(): void {
    this.authService.loginWithFacebook().then(
      () => {
        this.toasterService.pop('success', 'Success', 'You are now logged in');
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle().then(
      () => {
        this.toasterService.pop('success', 'Success', 'You are now logged in');
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  onForgotPassword(): boolean {
    const email = this.loginForm.get('email').value;

    if(!email) {
      this.errorMessage = 'Please enter your email address';
    }
    this.authService.sendPasswordResetEmail(email).then(
      () => {
        this.toasterService.pop('success', 'Email sent', 'Please check your mailbox');
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
    return false;
  }

}
