import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserEditService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    })
  };

  putDiet(diet: object): Observable<object> {
    return this.httpClient.put(
      `https://team-recipes.herokuapp.com/account/diet`,
      JSON.stringify(diet),
      this.httpOptions
    );
  }
  putEmail(email: object): Observable<object> {
    return this.httpClient.put(
      `https://team-recipes.herokuapp.com/account/email`,
      JSON.stringify(email),
      this.httpOptions
    );
  }
  putPassword(newPassword: object): Observable<object> {
    return this.httpClient.put(
      `https://team-recipes.herokuapp.com/account/password`,
      JSON.stringify(newPassword),
      this.httpOptions
    );
  }
}
