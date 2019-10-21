import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserState } from '../models/userState.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  stateUser: UserState;

/**
 * @param store Injecting the Store with the interface AppState into the constructor.
 * @param router Injecting the ActivatedRoute into the constructor.
 */
  constructor(private store: Store<AppState>, private router: Router) {
    store.select('userState').subscribe(data => {
      this.stateUser = data;
    });
  }

  /**
   * Checks if the request have the No-Auth header else checks if there is a userState(user is logged in)
   * if logged in add the JWT to the header, else redirect to login page
   * @param req The outgoing request object to handle.
   * @param next The next interceptor in the chain, or the backend if no interceptors remain in the chain.
   */
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
