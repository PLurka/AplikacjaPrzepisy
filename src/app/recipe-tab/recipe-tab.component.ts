import { Component, OnInit, Input } from "@angular/core";
import { MatTableDataSource, MatSnackBar } from "@angular/material";
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
  input: string;
  spinner: boolean;
  actualPage: number;
  actualLimit: number;
  actualSort: string;
  recipes;
  recipeCard: Recipe = new Recipe();
  dataSource;
  typeTab: string;
  displayedColumns: string[] = ['title', 'vege', 'author', 'show'];
  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
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
    if(this.typeTab == "all")
      this.getRecipes();
    // if(this.typeTab == "user")
    //   this.getUserRecipes(this.userId);
    // if(this.typeTab == "input")
    //   this.searchRecipes(this.input);
  }

  nextPage() {
    this.actualPage += 1;
    if(this.typeTab == "all")
      this.getRecipes();
    // if(this.typeTab == "user")
    //   this.getUserRecipes(this.userId);
    // if(this.typeTab == "input")
    //   this.searchRecipes(this.input);
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
        this.dataSource = new MatTableDataSource(this.recipes);
        console.log(this.recipes);
        this.spinner = false;
        this.typeTab = "all";
      });
  }

  getUserRecipes(userId: number) {
    this.spinner = true;
    this.userService.getUserRecipes(userId).subscribe(response => {
      this.recipes = new Array<Recipe>();
      this.recipes = response;
      if (this.recipes.length > 0) {
        this.dataSource = new MatTableDataSource(this.recipes);
      }
      this.spinner = false;
      this.typeTab = "user";
    });
  }

  searchRecipes(input: string) {
    if(input == null) {
      this.snackBar.open('You need to enter something!', 'OK', {
        duration: 3000
      });
    } else {
      this.spinner = true;
      this.recipeService.searchRecipes(input).subscribe(response => {
        this.recipes = new Array<Recipe>();
        this.recipes = response["recipes"];
        if (this.recipes.length > 0) {
          this.dataSource = new MatTableDataSource(this.recipes);
        }
        this.spinner = false;
        this.typeTab = "input";
    })
    }
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
