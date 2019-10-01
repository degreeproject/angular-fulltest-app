import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('api/user/all');
  }

  registerUser(user: any): Observable<any> {
    console.log(user);
    return this.http.post<any>('api/user', user);
  }

  loginUser(user: any): Observable<any> {
    console.log(user);
    return this.http.get<any>('api/user', {params: user});
  }
}
