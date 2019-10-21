import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';
import { UserState } from '../models/userState.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

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
   * Checks if the user is logged in, else send to loginpage.
   */
  canActivate(): boolean {
      if (typeof(this.stateUser[0]) !== 'undefined') {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
}
