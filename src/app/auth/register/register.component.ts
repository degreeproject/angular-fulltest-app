import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

/**
 * @param authService Injecting the AuthService into the constructor.
 * @param router Injecting the ActivatedRoute into the constructor.
 */
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

  /**
   * Error message if the email is missing or not vaild
   */
  getErrorMessage() {
    return this.profileForm.get('email').hasError('required') ? 'You must enter a value' :
        this.profileForm.get('email').hasError('email') ? 'Not a valid email' :
            '';
  }
  /**
   * Error message if the password is to short
   */
  getPWErrorMessage() {
    return this.profileForm.get('password').hasError('minlength') ? 'Password too short' :
    '';
  }

  ngOnInit() {
  }
  /**
   * On form submition, checks if the passwords match and pass the form values to registerUser in authService.
   */
  onSubmit() {
    if (this.profileForm.get('password').value !== this.profileForm.get('password2').value) {
      this.nomatch = true;
      return;
    }
    this.profileForm.removeControl('password2');
    this.authService.registerUser(
      this.profileForm.value).subscribe(res => {
        this.router.navigate(['/login']);
      });
  }

}
