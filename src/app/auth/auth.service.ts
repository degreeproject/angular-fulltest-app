import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  reqHeader = new HttpHeaders({'No-Auth': 'true'});

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('api/user/all', {headers: this.reqHeader});
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>('api/user', user, {headers: this.reqHeader});
  }

  loginUser(user: any): Observable<any> {
    return this.http.get<any>('api/auth', {params: user, headers: this.reqHeader});
  }
}
