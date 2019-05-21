import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  balance: number;
  depositAmount: number;
  withdrawalAmount: number;
  constructor(private authService: AuthService, private homeService: HomeService) { }

  countDecimals(value) {
    if(Math.floor(value) === value) return 0;
    if(!value.toString().includes(".")){
      return 0;
    }
    return value.toString().split(".")[1].length || 0;
  }

  ngOnInit() {
    this.homeService.getBalance().subscribe(balance => {
      this.balance = balance;
    })
  }
  logout(){
    this.authService.logout();
  }
  deposit(){
    const input = prompt("Please enter your amount", "0");
    if(!input){
      return;
    }
    if(isNaN(Number(input))){
      window.alert("Invalid input");
    }
    if(this.countDecimals(input) > 2){
      window.alert("Only support two decimal precision");
    }
    else{
      this.depositAmount = parseFloat(input);
      this.homeService.deposit(this.depositAmount).subscribe(balance => {
        this.balance = balance;
      })
    }
  }
  withdrawal(){
    const input = prompt("Please enter your amount", "0");
    if(!input){
      return;
    }
    if(isNaN(Number(input))){
      window.alert("Invalid input");
    }
    if(this.countDecimals(input) > 2){
      window.alert("Only support two decimal precision");
    }
    else{
      this.withdrawalAmount = parseFloat(input);
      this.homeService.withdrawal(this.withdrawalAmount).subscribe(balance => {
        this.balance = balance;
      })
    }
  }

}
