import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {Password, Token, User} from './models';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  BASE_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {
  }

  register(username: string, password: string, email: string): any {
    return this.http.post<User>(`${this.BASE_URL}/register`, {
      username,
      password,
      email,
    });
  }

  login(username: string, password: string): Observable<Token> {
    return this.http.post<Token>(`${this.BASE_URL}/login`, {
      username,
      password,
    });
  }

  logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/refresh`, {"refresh": localStorage.getItem("refresh")})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => {
            return error
          });
        })
      );
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/${username}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.BASE_URL}/users/${user.id}`,
      {
        "username": user.username,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email
      });
  }

  updatePassword(password: Password): Observable<any> {
    return this.http.post<Password>(`${this.BASE_URL}/users/password`, JSON.stringify(password));
  }
}
