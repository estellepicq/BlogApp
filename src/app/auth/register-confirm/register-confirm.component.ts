import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent implements OnInit {

  setPasswordForm: FormGroup;
  errorMessage: string;
  errorMessagePasswordConfirm: string;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.initForm();
    this.completingRegister();
  }

  initForm(): void {
    this.setPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)]],
      passwordConfirm: ['', [Validators.required]]
    });
  }

  completingRegister() {
    this.authService.completingRegister().then(
      () => {
        //valid link
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  onSubmit(): void|boolean {
    const password = this.setPasswordForm.get('password').value;
    const passwordConfirm = this.setPasswordForm.get('passwordConfirm').value;

    if(password !== passwordConfirm) {
      this.errorMessagePasswordConfirm = 'Please enter the same password for confirmation';
      return false;
    }
    this.authService.updatePassword(password).then(
      () => {
        this.toasterService.pop('success', 'Success', 'Your account is now created');
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );

  }

}
