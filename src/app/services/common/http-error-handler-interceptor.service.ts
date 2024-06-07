import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { AlertifyService, MessagePosition, MessageType } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private alertify : AlertifyService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     return next.handle(req).pipe(catchError(error => {
      
      switch (error.status) {
        case HttpStatusCode.BadRequest:
          this.alertify.message("Bad request", {
            messageType: MessageType.Error,
            messagePosition: MessagePosition.TopRight
          });
          break;
        case HttpStatusCode.Unauthorized:
          this.alertify.message("Unauthorized", {
            messageType: MessageType.Error,
            messagePosition: MessagePosition.TopRight
          });
          break;
        case HttpStatusCode.NotFound:
          this.alertify.message("Not Found", {
            messageType: MessageType.Error,
            messagePosition: MessagePosition.TopRight
          });
          break;
        case HttpStatusCode.InternalServerError:
          this.alertify.message("Internal Server Error", {
            messageType: MessageType.Error,
            messagePosition: MessagePosition.TopRight
          });
          break;
        }
          return of(error);
       
     }));
     
    
    
  }











}
