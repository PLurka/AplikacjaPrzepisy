import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Recipe } from "../recipe";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    })
  };

  getRecipe(recipeId: string): Observable<object> {
    return this.httpClient
      .get(
        `https://team-recipes.herokuapp.com/recipes/${recipeId}`,
        this.httpOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getRecipes(page: number, limit: number, sort: string): Observable<object> {
    return this.httpClient
      .get(
        `https://team-recipes.herokuapp.com/recipes?page=${page}&limit=${limit}&sort=${sort}`,
        this.httpOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  searchRecipes(input: string): Observable<object> {
    return this.httpClient
      .get(
        `https://team-recipes.herokuapp.com/search/recipes?query=${input}`,
        this.httpOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  createRecipe(recipe: Recipe): Observable<Object> {
    return this.httpClient.post(
      "https://team-recipes.herokuapp.com/recipes/",
      JSON.stringify(recipe),
      this.httpOptions
    );
  }

  deleteRecipe(recipeId: string): Observable<object> {
    return this.httpClient.delete(
      `https://team-recipes.herokuapp.com/recipes/${recipeId}`,
      this.httpOptions
    );
  }

  putRecipe(recipeId: string, recipe: Recipe): Observable<object> {
    return this.httpClient.put(
      `https://team-recipes.herokuapp.com/recipes/${recipeId}`,
      JSON.stringify(recipe),
      this.httpOptions
    );
  }
}
