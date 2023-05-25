import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        if(error) {

          // Error 400 Not Found
          if(error.status === 400) {
            if(error.error.errors) {
              throw error.error;
            } else {
              this.toastr.error(error.error.message, error.status.toString());
            }
          };

          // Error 401 Not Found
          if(error.status === 401) {
            this.toastr.error(error.error.message, error.status.toString());
            console.log("error.status === 401");
          };

          // Error 404 Not Found
          if(error.status === 404) {
            this.router.navigateByUrl('/not-found');
            console.log("error.status === 404");
          };

          // Error 404 Not Found
          if(error.status === 500) {
            const navigationExtras: NavigationExtras = {state:{error: error.error}}; // passing error responses to the componenet "ServerError"
            this.router.navigateByUrl('/server-error', navigationExtras);
            console.log("error.status === 500");
          };
        }

        return throwError(() => new Error(error.message));
      })
    );
  }
}
