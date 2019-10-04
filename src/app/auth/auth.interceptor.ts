import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { userState } from '../models/userState.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  stateUser: userState;

  constructor(private router: Router, private store: Store<AppState>) {
    store.select('userState').subscribe(data => {
      this.stateUser = data;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'true') {
      return next.handle(req.clone());
    }

    if (typeof(this.stateUser[0]) !== 'undefined') {
      const clonereq = req.clone({
        headers: req.headers.set('Authorization', this.stateUser[0].token_type + ' ' + this.stateUser[0].access_token)
      });
      return next.handle(clonereq).pipe(tap(
        succ => {},
        err => {
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }
        }
      ));
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
