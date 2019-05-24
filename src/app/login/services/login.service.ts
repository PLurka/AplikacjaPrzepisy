import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    const user = {username, password};
    return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/login`,
    JSON.stringify(user), this.httpOptions).pipe(map(res => {
      this.save(username, res.token);
      return res;
    }));
  }

  save(username: string, token: string) {
    localStorage.setItem('user', username);
    localStorage.setItem('token', token);
  }


}
