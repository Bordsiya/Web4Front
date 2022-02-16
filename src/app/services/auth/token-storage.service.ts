import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const LOGIN_KEY = 'AuthLogin';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveLogin(login: string) {
    window.sessionStorage.removeItem(LOGIN_KEY);
    window.sessionStorage.setItem(LOGIN_KEY, login);
  }

  public getLogin(): string | null {
    return sessionStorage.getItem(LOGIN_KEY);
  }

  constructor() { }
}
