import {Injectable} from "@angular/core";
import {HttpFactory} from "../http/httpFactory.service";
import {HttpResponse} from "../http/httpResponse.model";
import {Router} from "@angular/router"
import {LocalStorageService} from "../storage/storage.service";
import { Subject } from 'rxjs';

export const AUTH_KEY = 'AUTH';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    token: string;

    private isAuthenticatedSource = new Subject<boolean>();

    isAuthenticated$ = this.isAuthenticatedSource.asObservable();
    constructor(private httpFactory: HttpFactory, public router: Router, private localStorageService: LocalStorageService){

    }
    login(cardNumber: string, pin: string){
        this.httpFactory.post("account/verifyaccount", {cardNumber, pin})
        .subscribe((response : HttpResponse) => {
            if(response.status === 200){
                this.token = response.data.token;
                this.localStorageService.setItem(AUTH_KEY, {authToken: this.token});
                this.announceAthenticated(true);
                console.log(response.data);
                this.router.navigate(["home"]);
            }
        })
    }
    logout(){
        this.httpFactory.post("account/logout",{})
        .subscribe((response : HttpResponse) => {
            if(response.status === 200){
                this.localStorageService.removeItem(AUTH_KEY);
                this.announceAthenticated(false);
                this.router.navigate(["login"]);
            }
        })
    }
    generateNewCard(){
        this.httpFactory.post("account/generateAccount",{})
        .subscribe((response : HttpResponse) => {
            if(response && response.status === 200){
                // window.confirm(`New card Number is ${response.data.cardNumber} \nPin is ${response.data.pin}`);
                prompt("Please remember your new card info:", `Number: ${response.data.cardNumber}, Pin: ${response.data.pin}`);
            }
            else{
                alert("Something wrong when generating the new card");
            }
        })
    }
    getToken(){
        return this.localStorageService.getItem(AUTH_KEY);
    }
    announceAthenticated(state: boolean){
        this.isAuthenticatedSource.next(state);
    }

}