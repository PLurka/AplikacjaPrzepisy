// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserEditService {

//   constructor(private httpClient: HttpClient) { }

//   httpOptions = {
//     headers: new HttpHeaders({
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + localStorage.getItem("token")
//     })
//   };

//   putDiet(diet: string): Observable<object> {
//     return this.httpClient.put(
//       `https://team-recipes.herokuapp.com/recipes/${recipeId}`,
//       JSON.stringify(recipe),
//       this.httpOptions
//     );
//   }
//   putEmail(recipeId: string): Observable<object> {
//     return this.httpClient.put(
//       `https://team-recipes.herokuapp.com/recipes/${recipeId}`,
//       JSON.stringify(recipe),
//       this.httpOptions
//     );
//   }
//   putPassword(newPassword: string): Observable<object> {
//     return this.httpClient.put(
//       `https://team-recipes.herokuapp.com/recipes/${recipeId}`,
//       JSON.stringify(recipe),
//       this.httpOptions
//     );
//   }
// }
