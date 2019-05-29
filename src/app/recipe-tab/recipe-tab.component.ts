import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { RecipeService } from '../recipe/services/recipe.service';
import { Recipe } from '../recipe/recipe';
import { Router } from '@angular/router';

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
  recipeCard: Recipe = new Recipe();
  dataSource;
  displayedColumns: string[] = [ 'title', 'vege', 'show'];
  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    this.spinner = true;
    this.actualPage = 0;
    this.actualLimit = 10;
    this.actualSort = 'Title';
    this.getRecipes();
  }

  prevPage() {
    if (this.actualPage > 0) { this.actualPage -= 1; }
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
        this.recipes = new Array<Recipe>();
        for (const recipe of res['recipes']) {
          this.recipes.push(recipe);
        }
        this.dataSource = new MatTableDataSource(this.recipes);
        this.spinner = false;
      });
  }

  navigateRecipe(recipeId: string) {
    this.router.navigate(['/recipe'], { queryParams: { id: recipeId } });
  }

  navigateForm() {
    this.router.navigate(['/new'], { queryParams: { typeForm: 1 } });
  }
}
// private paginator: MatPaginator;
// private sort: MatSort;

// @ViewChild(MatSort) set matSort(ms: MatSort) {
//   this.sort = ms;
//   this.setDataSourceAttributes();
// }

// @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
//   this.paginator = mp;
//   this.setDataSourceAttributes();
// }

// setDataSourceAttributes() {
//   this.dataSource.paginator = this.paginator;
//   this.dataSource.sort = this.sort;

//   if (this.paginator && this.sort) {
//     this.applyFilter('');
//   }
// }

// applyFilter(filterValue: string) {
//   this.dataSource.filter = filterValue.trim().toLowerCase();
// }
