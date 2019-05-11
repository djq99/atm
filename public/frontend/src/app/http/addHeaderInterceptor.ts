import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse
  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalStorageService} from "../storage/storage.service";
import {Injectable} from "@angular/core";
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';


export const AUTH_KEY = 'AUTH';

@Injectable({
    providedIn: 'root',
})
  export class addHeaderInterceptor implements HttpInterceptor {
      constructor(private localStorageService: LocalStorageService, private authService: AuthService){

      }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Clone the request to add the new header
      const token = this.localStorageService.getItem(AUTH_KEY);
      if(token){
        const clonedRequest = req.clone({ headers: req.headers.set('Authorization', `${token.authToken}`) });
        return next.handle(clonedRequest).pipe(map(event => {
            if(event instanceof HttpResponse){
              if(!event.body || event.body.status !== 200){
                this.authService.logout();
              }
              return event;
            }
            return event;
          }));
      }
      else{
        return next.handle(req).pipe(map(event => {
            if(event instanceof HttpResponse){
              if(!event.body || event.body.status !== 200){
                this.authService.logout();
              }
              return event;
            }
            return event;
          }));
      }
      

  
      // Pass the cloned request instead of the original request to the next handle
    }
  }