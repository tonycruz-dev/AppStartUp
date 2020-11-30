import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusyService } from '../busy.service';
import { Injectable } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private busyService: BusyService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      this.busyService.busy();
      return next.handle(request).pipe(
        finalize(() => {
          this.busyService.idle();
        })
      );
    }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     if (req.url.includes('DELETE')) {
    //         return next.handle(req);
    //     }
    //     if (req.url.includes('emailexists')) {
    //         return next.handle(req);
    //     }
    //     this.busyService.busy();
    //     return next.handle(req).pipe(
    //         finalize(() => {
    //             this.busyService.idle();
    //         })
    //     );
    // }
}
