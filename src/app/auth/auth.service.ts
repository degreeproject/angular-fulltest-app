import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  /**
   * @param http Injecting the HttpClient into the constructor.
   */
  constructor(private http: HttpClient) { }

  reqHeader = new HttpHeaders({'No-Auth': 'true'});

 /**
  * post a user to the server api "api/user" to register user
  * @param user the user that should be registered
  */
  registerUser(user: any): Observable<any> {
    return this.http.post<any>('api/user', user, {headers: this.reqHeader});
  }

  /**
   * get request to the server api "api/auth" to verify login
   * @param user login credentials for the user who tries to login
   */
  loginUser(user: any): Observable<any> {
    return this.http.get<any>('api/auth', {params: user, headers: this.reqHeader});
  }
}
