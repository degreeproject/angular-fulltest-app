import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';
import { userState } from '../models/userState.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  stateUser: userState;

  constructor(private store: Store<AppState>, private router: Router) {
    store.select('userState').subscribe(data => {
      this.stateUser = data;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (typeof(this.stateUser[0]) !== 'undefined') {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
}
