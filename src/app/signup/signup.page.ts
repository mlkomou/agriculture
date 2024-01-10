import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";
import {Farmer} from "../model/farmer";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: UntypedFormGroup) => {
    let password= group.controls[passwordKey];
    let passwordConfirmation= group.controls[passwordConfirmationKey];
    if (password.value !== passwordConfirmation.value) {
      return passwordConfirmation.setErrors({mismatchedPasswords: true})
    }
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
farmerForm: FormGroup;
creating: boolean = false;
  constructor(private fb: FormBuilder,
              private apiService: ApiService,
              private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  formatForm(form: FormGroup): Farmer {
    return {
      fullName: form.value.fullName,
      password: form.value.password,
      phone: form.value.phone
    }
  }

  createForm() {
    this.farmerForm = this.fb.group({
      fullName: [null, Validators.required],
      password: [null, Validators.required],
      phone: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, {validator: matchingPasswords('password', 'confirmPassword')});
  }
  siginup() {
  if (this.farmerForm.valid) {
    this.creating = true;
    this.apiService.signup(this.formatForm(this.farmerForm)).subscribe((res) => {
      if (res.ok) {
        this.creating = false;
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        this.router.navigate(['home']);
      } else {
        this.creating = false;
      }
    }, error => {
      this.creating = false;
    });
  }
  }
}
