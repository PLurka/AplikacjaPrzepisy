import { Component, OnInit, Input } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { RecipeService } from "../recipe/services/recipe.service";
import { Recipe } from "../recipe/recipe";
import { Router } from "@angular/router";
import { UserService } from "../user/services/user.service";

@Component({
  selector: 'app-recipe-tab',
  templateUrl: './recipe-tab.component.html',
  styleUrls: ['./recipe-tab.component.css']
})
export class RecipeTabComponent implements OnInit {
  spinner: boolean;
  actualPage: number;
  actualLimit: number;
  actualSort: string;
  recipes;
  userRecipes;
  recipeCard: Recipe = new Recipe();
  dataSource;
  displayedColumns: string[] = ['title', 'vege', 'author', 'show'];
  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.spinner = true;
    this.actualPage = 0;
    this.actualLimit = 10;
    this.actualSort = 'Title';
    console.log(this.userId);
    if (this.userId == 0) {
      this.getRecipes();
      console.log(this.userId);
    }
    else this.getUserRecipes(this.userId);
  }

  @Input()
  userId: number;


  prevPage() {
    if (this.actualPage > 0) {
      this.actualPage -= 1;
    }
    this.getRecipes();
  }

  nextPage() {
    this.actualPage += 1;
    this.getRecipes();
  }

  getRecipes() {
    this.spinner = true;
    this.recipeService
      .getRecipes(this.actualPage, this.actualLimit, this.actualSort)
      .subscribe(res => {
        console.log(res);
        this.recipes = new Array<Recipe>();
        for (const recipe of res['recipes']) {
          this.recipes.push(recipe);
        }
        this.userRecipes=this.recipes;
        this.dataSource = new MatTableDataSource(this.recipes);
        console.log(this.recipes);
        this.spinner = false;
      });
  }

  getUserRecipes(userId: number) {
    this.spinner = true;
    this.userService.getUserRecipes(userId).subscribe(res => {
      this.userRecipes = new Array<Recipe>();
      this.userRecipes = res;
      if (this.userRecipes.length > 0) {
        this.dataSource = new MatTableDataSource(this.userRecipes);
      }
      this.spinner = false;
    });
  }

  navigateRecipe(recipeId: string) {
    this.router.navigate(['/recipe'], { queryParams: { id: recipeId } });
  }

  navigateProfile(userId: string) {
    if (JSON.parse(localStorage.getItem('user'))['id'] === userId) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/user'], {
        queryParams: {
          userId: userId
        }
      });
    }
  }
}
