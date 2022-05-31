/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { FbAuthResponse, User } from '../../../shared/interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })

export class AuthService {
  constructor(private http: HttpClient) {}

  public error$: Subject<string> = new Subject<string>();

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apikey}`, user)
      .pipe(
        tap<any>(this.setToken),
        catchError(this.handleError.bind(this)),
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated() {
    return of(!!this.token);
  }

  handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid email');

        break;
      case 'INVALID_EMAIL':
        this.error$.next('Invalid password');

        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found');
        break;
    }
    return throwError(() => error);
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
