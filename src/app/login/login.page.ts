import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
phone: number;
userForm: FormGroup;
  userPresent: boolean = false;
  checking: boolean = false;
  signing: boolean = false;
  constructor(private router: Router,
              private apiService: ApiService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      email: [null, Validators.required],
      password: []
    });
  }
  checkUser(phone: string) {
    if (this.userForm.valid) {
      this.checking = true;
      this.apiService.checkUser(phone).subscribe((res) => {
        console.log(res);
        if (res.ok) {
          this.checking = false;
          this.userPresent = true;
        } else {
          this.checking = false;
          this.router.navigate(['signup']);
          // this.apiService.showToast(res.message, 3000, 'danger', 'top');
        }
      }, error => {
        this.checking = false;
        this.apiService.showToast("Erreur de création de compte, veuillez réessayer plus tard", 3000, 'danger', 'top');
      });
    }
  }
  checkUserPresence() {
    this.checkUser(this.userForm.value.email);
    // if (this.phone) {
    //
    //   // this.router.navigate(['home']);
    // }
  }

  sigin() {
    this.signing = true;
    this.apiService.signin(this.userForm.value).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.signing = false;
        // this.router.navigate(['home']);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        this.router.navigate(['home']);
      } else {
        this.signing = false;
        this.apiService.showToast(res.message, 3000, 'danger', 'top');
      }
    }, error => {
      this.signing = false;
      this.apiService.showToast("Erreur de connexion, veuillez vérifier votre mot de passe.", 3000, 'danger', 'top');
    });
  }
}
