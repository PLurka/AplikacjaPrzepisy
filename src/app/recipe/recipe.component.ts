import { Ingredient } from "./../ingredient/ingredient";
import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login/services/login.service";
import { Recipe } from "./recipe";
import { RecipeService } from "./services/recipe.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.css"],
  providers: [LoginService]
})
export class RecipeComponent implements OnInit {
  recipeCard: Recipe = new Recipe();
  recipes;
  spinner: boolean;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.getRecipe(params["id"]);
      this.spinner = true;
    });
  }

  getRecipe(recipeId: string) {
    this.recipeService.getRecipe(recipeId).subscribe(res => {
      this.recipeCard.id = res["id"];
      this.recipeCard.description = res["description"];
      this.recipeCard.title = res["title"];
      this.recipeCard.vege = res["vege"];
      for (let i = 0; i < res["ingredients"].length; i++) {
        this.recipeCard.ingredients[i] = new Ingredient();
        this.recipeCard.ingredients[i] = res["ingredients"][i]["ingredient"];
      }
      this.spinner = false;
    });
  }

  deleteRecipe(recipeId: string) {
    console.log(recipeId);
    this.recipeService.deleteRecipe(recipeId).subscribe(
      response => {
        console.log(response);
        this.recipeCard = new Recipe();
        this.router.navigate(["/recipes"]);
      },
      error => {
        console.log(error);
      }
    );
  }

  editRecipe() {
    this.router.navigate(["/edit"], {
      queryParams: { recipeId: this.recipeCard.id, typeForm: 0 }
    });
  }
}
