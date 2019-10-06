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

  userState: Observable<UserState>;

  stateUser: UserState;

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
/*     const t = JSON.parse(localStorage.getItem('user'));
    console.log(t.username); */
    console.log(typeof(localStorage.getItem('user')));
  }
  logout() {
    this.removeUserState();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  removeUserState() {
    this.store.dispatch(new authActions.RemoveState(0));
  }
  ngOnInit() {

  }

}
