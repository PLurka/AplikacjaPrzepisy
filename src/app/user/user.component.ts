import { Component, OnInit } from "@angular/core";
import { UserService } from "./services/user.service";
import { Recipe } from "../recipe/recipe";
import { MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  userRecipes;
  spinner: boolean;
  dataSource;
  displayedColumns: string[] = ["title", "vege", "show"];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.spinner = true;
    // this.getRecipes(localStorage.getItem);//get id from localstorage
  }

  getRecipes(userId: string) {
    this.spinner = true;
    this.userService
      .getUserRecipes(userId)
      .subscribe(res => {
        this.userRecipes = new Array<Recipe>();
        for (let recipe of res["recipes"]) {
          this.userRecipes.push(recipe);
        }
        this.dataSource = new MatTableDataSource(this.userRecipes);
        this.spinner = false;
      });
  }

  navigateRecipe(recipeId: string) {
    this.router.navigate(["/recipe"], { queryParams: { id: recipeId } });
  }

  navigateForm() {
    this.router.navigate(["/new"], { queryParams: { typeForm: 1 } });
  }
}
