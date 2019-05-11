import {Injectable} from "@angular/core";
const baseUrl = "http://ec2-54-81-140-182.compute-1.amazonaws.com/api/";
// const baseUrl = "http://localhost:3000/api/"
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type":  "application/json",
    })
}

@Injectable({
    providedIn: 'root',
})
export class HttpFactory{
    constructor(private httpClient: HttpClient){
    }
    get(router: string, params: object): Observable<object>{
        return this.httpClient.get(`${baseUrl}${router}`, params)
        .pipe(
            retry(1),
            catchError(this.handleError)
          );
    }
    post(router: string, params: object): Observable<object>{
        return this.httpClient.post(`${baseUrl}${router}`, params, httpOptions)
        .pipe(
            retry(1),
            catchError(this.handleError)
          );
    }
    put(router: string, params: object): Observable<object>{
        return this.httpClient.put(`${baseUrl}${router}`, params, httpOptions)
        .pipe(
            retry(1),
            catchError(this.handleError)
          );
    }
    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error: ${error.error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      }
}
