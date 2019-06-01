import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredient/ingredient';
import { FridgeService } from './services/fridge.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css']
})
export class FridgeComponent implements OnInit {
  spinner: boolean;
  fridge;
  constructor(
    private fridgeService: FridgeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.spinner = true;
    this.getFridge();
  }

  selectedIngredient(ingredient: Ingredient) {
    if (this.validateIngredient(ingredient.id) === true) {
      this.addIngredient(ingredient.id);
    }
  }

  validateIngredient(ingredientId: string): boolean {
    for (let i = 0; i < this.fridge.length; i++) {
      if (this.fridge[i].id === ingredientId) {
        this.snackBar.open('Ingredient already exists in your fridge!', 'OK', {
          duration: 2000
        });
        return false;
      }
    }
    return true;
  }

  getFridge() {
    this.fridgeService.getFridge().subscribe(response => {
      this.fridge = new Array<Ingredient>();
      for (let i = 0; i < response['ingredients'].length; i++) {
        this.fridge[i] = new Ingredient();
        this.fridge[i] = response['ingredients'][i]['ingredient'];
      }
      this.spinner = false;
    });
  }

  deleteIngredient(ingredientId: string) {
    this.spinner = true;
    this.fridgeService.deleteIngredient(ingredientId).subscribe(response => {
      console.log(response);
      this.getFridge();
    });
  }

  addIngredient(ingredientId: string) {
    this.spinner = true;
    this.fridgeService.addIngredient(ingredientId).subscribe(response => {
      console.log(response);
      this.getFridge();
    });
  }

  clearFridge() {
    this.spinner = true;
    this.fridgeService.clearFridge().subscribe(response => {
      this.snackBar.open('Fridge successfully cleared!', 'OK', {
        duration: 2000
      });
      this.getFridge();
    });
  }
}
