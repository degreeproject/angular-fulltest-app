import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/app.states';
import { userState } from './../../models/userState.model';
import * as authActions from './../../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { }
  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  hide = true;
  failedLogin = false;

  setUserState(username: string, token: string, loggedIn: boolean) {
    this.store.dispatch(new authActions.SetState({username, token, loggedIn}));
  }

  ngOnInit() {
  }
  onSubmit() {
    this.authService.loginUser(
      this.profileForm.value).subscribe(res => {
        this.setUserState(this.profileForm.get('username').value, res.access_token, true);
        console.log(res.message);
        console.log(res);
        this.failedLogin = false;
        localStorage.setItem('access_token', 'logged4'/* res.access_token */);
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
        console.log(error.error.message);
        if (error.error.message === 'Wrong credentials') {
          this.failedLogin = true;
        }
      });
  }

}
