import { Component, OnInit, Input } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(7)])
  });
  hide = true;

  nomatch = false;


  getErrorMessage() {
    return this.profileForm.get('email').hasError('required') ? 'You must enter a value' :
        this.profileForm.get('email').hasError('email') ? 'Not a valid email' :
            '';
  }
  getPWErrorMessage() {
    return this.profileForm.get('password').hasError('minlength') ? 'Password too short' :
    '';
  }

  ngOnInit() {
  }
  onSubmit() {
    console.warn(this.profileForm.value);
    if (this.profileForm.get('password').value !== this.profileForm.get('password2').value) {
      this.nomatch = true;
      console.log('no match');
      return;
    }
    this.profileForm.removeControl('password2');
    this.authService.registerUser(
      this.profileForm.value).subscribe(res => {
        console.log(res);
        this.router.navigate(['/login']);
      });
  }

}
