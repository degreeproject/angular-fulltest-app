import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  hide = true;
  failedLogin = false;

  ngOnInit() {
  }
  onSubmit() {
    this.authService.loginUser(
      this.profileForm.value).subscribe(res => {
        console.log(res);
        this.failedLogin = false;
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
        this.failedLogin = true;
      }
      );
  }

}
