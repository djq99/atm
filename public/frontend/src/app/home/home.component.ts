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
    else{
      this.withdrawalAmount = parseFloat(input);
      this.homeService.withdrawal(this.withdrawalAmount).subscribe(balance => {
        this.balance = balance;
      })
    }
  }

}
