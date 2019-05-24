import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  save(username: string, token: string) {
    localStorage.setItem('user', username);
    localStorage.setItem('token', token);
  }


  register(username: string, name: string, surname: string, email: string, password: string, confirmPassword: string) {
    const user = { username, name, surname, email, password, confirmPassword };
    return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/register`,
      JSON.stringify(user), this.httpOptions).pipe(map(res => {
        this.save(username, res.token);
        return res;
      }));
  }
}
