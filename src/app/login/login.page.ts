import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
phone: number;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.phone) {
      this.router.navigate(['home']);
    }
  }

  sigin() {

  }
}
