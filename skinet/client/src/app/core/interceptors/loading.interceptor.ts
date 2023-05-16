import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // skipping the loader to skip on specific page
    if(!request.url.includes('emailExists')) {  // emailExists is the api url
      this.busyService.busy();
    }
    
    return next.handle(request).pipe(
      delay(1000),
      finalize(() => this.busyService.idle())
    )
  }
}
