import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token, User } from './models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  BASE_URL = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  register(username: string, password: string, email: string): any {
    return this.http.post<User>(`${this.BASE_URL}/api/register`, {
      username,
      password,
      email,
    });
  }

  login(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(`${this.BASE_URL}/api/login`, {
      username,
      password,
    });
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/api/users/${username}`);
  }
}
