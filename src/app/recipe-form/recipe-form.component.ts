import { Ingredient } from "./../ingredient/ingredient";
import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe/recipe";
import { RecipeService } from "../recipe/services/recipe.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-recipe-form",
  templateUrl: "./recipe-form.component.html",
  styleUrls: ["./recipe-form.component.css"]
})
export class RecipeFormComponent implements OnInit {
  recipe: Recipe = new Recipe();
  typeForm: number;
  spinner: boolean;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params["typeForm"] == 0) {
        this.getRecipe(params["recipeId"]);
        this.spinner = true;
      } else {
        this.spinner = false;
      }
      this.typeForm = params["typeForm"];
    });
  }

  selectedIngredient(ingredient: Ingredient) {
    if (this.validateIngredient(ingredient.id) == true)
      this.recipe.ingredients.push(ingredient);
  }

  validateIngredient(ingredientId: string): boolean {
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      if (this.recipe.ingredients[i].id == ingredientId) {
        console.log("istnieje już taki składnik");
        return false;
      }
    }
    return true;
  }

  deleteIngredient(ingredient: Ingredient) {
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      if (this.recipe.ingredients[i].id == ingredient["id"])
        this.recipe.ingredients.splice(i, 1);
    }
  }

  checkVege(): boolean {
    for (let i = 0; i < this.recipe.ingredients.length; i++) {
      if (this.recipe.ingredients[i].vege == false) return false;
    }
    return true;
  }

  getRecipe(recipeId: string) {
    this.recipeService.getRecipe(recipeId).subscribe(res => {
      this.recipe.id = res["id"];
      this.recipe.description = res["description"];
      this.recipe.title = res["title"];
      this.recipe.vege = res["vege"];
      for (let i = 0; i < res["ingredients"].length; i++) {
        this.recipe.ingredients[i] = new Ingredient();
        this.recipe.ingredients[i] = res["ingredients"][i]["ingredient"];
      }
      this.spinner = false;
    });
  }

  createRecipe(): void {
    this.spinner = true;
    this.recipe.vege = this.checkVege();
    this.recipeService.createRecipe(this.recipe).subscribe(
      response => {
        this.recipe = new Recipe();
        this.router.navigate(["/recipes"]);
      },
      error => {
        console.log(error);
      }
    );
  }

  putRecipe(recipeId: string) {
    this.spinner = true;
    this.recipe.user = {
      //do zmiany po ogarnięciu usera
      id: 1,
      username: "admin",
      vege: false
    };
    this.recipe.vege = this.checkVege();
    this.recipeService.putRecipe(recipeId, this.recipe).subscribe(response => {
      this.recipe = new Recipe();
      this.router.navigate(["/recipe"], { queryParams: { id: recipeId } });
    });
  }
}
