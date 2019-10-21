import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../store/app.states';
import { Observable } from 'rxjs';
import { UserState } from './../models/userState.model';
import { Router } from '@angular/router';
import * as authActions from './../store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

/**
 * @param store Injecting the Store with the interface AppState into the constructor.
 * @param router Injecting the ActivatedRoute into the constructor.
 */
  constructor(private store: Store<AppState>, private router: Router) {
    store.select('userState').subscribe(data => {
      this.stateUser = data;
    });
  }

  userState: Observable<UserState>;

  stateUser: UserState;

  /**
   * checks if the user is logged in.
   */
  isLoggedIn() {
    if (typeof(this.stateUser[0]) === 'undefined') {
      return false;
    } else {
      return this.stateUser[0].loggedIn;
    }
  }

  /**
   * removing userState and localStorage and navigate to login page
   */
  logout() {
    this.store.dispatch(new authActions.RemoveState(0));
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
