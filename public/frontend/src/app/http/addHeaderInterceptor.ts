import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalStorageService} from "../storage/storage.service";
import {Injectable} from "@angular/core";


export const AUTH_KEY = 'AUTH';

@Injectable({
    providedIn: 'root',
})
  export class addHeaderInterceptor implements HttpInterceptor {
      constructor(private localStorageService: LocalStorageService){

      }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Clone the request to add the new header
      const token = this.localStorageService.getItem(AUTH_KEY);
      if(token){
        const clonedRequest = req.clone({ headers: req.headers.set('Authorization', `${token.authToken}`) });
        return next.handle(clonedRequest);
      }
      else{
          return next.handle(req);
      }
      

  
      // Pass the cloned request instead of the original request to the next handle
    }
  }