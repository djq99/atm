import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  model: any = {};

  ngOnInit() {
    if(this.authService.getToken()){
      this.router.navigate(["/home"]);
    }
  }
  onLogin(form: NgForm) {
    const cardNumber = form.value.cardNumber;
    const pin = form.value.pin;
    this.authService.login(cardNumber, pin);
  }
  generateNewCard(){
    this.authService.generateNewCard();
  }

}
