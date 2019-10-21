import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/app.states';
import * as authActions from './../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

/**
 * @param authService Injecting the AuthService into the constructor.
 * @param router Injecting the ActivatedRoute into the constructor.
 * @param store Injecting the Store with the interface AppState into the constructor.
 */
  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  hide = true;
  failedLogin = false;

/**
 * Sets the userstate to logged in.
 * @param username The username of the logged in user
 * @param access_token The user's JWT
 * @param loggedIn A boolean that which is true fore logged in users
 */
  // tslint:disable-next-line: variable-name
  setUserState(username: string, access_token: string, loggedIn: boolean) {
    this.store.dispatch(new authActions.SetState({username, token_type: 'Bearer', access_token, loggedIn}));
  }

  ngOnInit() {
  }

  /**
   * On form submition, sends the given username and password to loginUser in authService,
   * if login is successful, send username, accesstoken given from server and a boolen true to
   * the setUserState function and store token and user in local storage.
   */
  onSubmit() {
    this.authService.loginUser(
      this.profileForm.value).subscribe(res => {
        this.setUserState(this.profileForm.get('username').value, res.access_token, true);
        this.failedLogin = false;
        localStorage.setItem('user', JSON.stringify(
          {token: {
            type: res.token_type,
            access_token: res.access_token
          },
          username: res.name
        }));
        this.router.navigate(['/home']);
      },
      error => {
        if (error.error.message === 'Wrong credentials') {
          this.failedLogin = true;
        }
      });
  }

}
