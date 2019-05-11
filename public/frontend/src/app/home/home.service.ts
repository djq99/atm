import {Injectable} from "@angular/core";
import {HttpFactory} from "../http/httpFactory.service";
import {HttpResponse} from "../http/httpResponse.model";
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
})

export class HomeService {

    constructor(private httpFactory: HttpFactory){}
    getBalance(){
        return this.httpFactory.post("account/getBalance", {
        }).pipe(
            map((response : HttpResponse) => {
                if(response.status === 200){
                    return response.data;
                }
            })
        )
    }
    deposit(amount){
        return this.httpFactory.post("account/depositMoney", {amount}).pipe(
            map((response : HttpResponse) => {
                if(response.status === 200){
                    return response.data.newAmount;
                }
            })
        )
    }
    withdrawal(amount){
        return this.httpFactory.post("account/withdrawalmoney", {amount}).pipe(
            map((response : HttpResponse) => {
                if(response.status === 200){
                    return response.data.newAmount;
                }
            })
        )
    }
}