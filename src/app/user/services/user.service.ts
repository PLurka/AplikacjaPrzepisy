import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    })
  };

  getUser(userId: number): Observable<object> {
    return this.httpClient
      .get(
        `https://team-recipes.herokuapp.com/users/${userId}`,
        this.httpOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getUsers(page: number, limit: number): Observable<object> {
    return this.httpClient
      .get(
        `https://team-recipes.herokuapp.com/users?page=${page}&limit=${limit}`,
        this.httpOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getUserRecipes(userId: number): Observable<object> {
    return this.httpClient
      .get(
        `https://team-recipes.herokuapp.com/users/${userId}/recipes`,
        this.httpOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }
}
