import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../store/app.states';
import { Observable } from 'rxjs';
import { userState } from './../models/userState.model';
import { Router } from '@angular/router';
import * as authActions from './../store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userState: Observable<userState>;

  stateUser: userState;

  constructor(private store: Store<AppState>, private router: Router) {
    store.select('userState').subscribe(data => {
      this.stateUser = data;
    });
  }

  isLoggedIn() {
    if (typeof(this.stateUser[0]) === 'undefined') {
      return false;
    } else {
      return this.stateUser[0].loggedIn;
    }
  }

  checkState() {
    console.log(this.stateUser);
  }
  logout() {
    this.removeUserState();
    this.router.navigate(['/login']);
  }
  removeUserState() {
    this.store.dispatch(new authActions.RemoveState(0));
  }
  ngOnInit() {

  }

}
