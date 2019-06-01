import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../ingredient/services/ingredient.service';
import { Ingredient } from '../ingredient/ingredient';

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['./ingredients-page.component.css']
})
export class IngredientsPageComponent implements OnInit {

  inputIdIngredient: string;
  ingredient: Ingredient;
  takenIngredient: Ingredient;
  createEdit: boolean;
  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.createEdit = true;
    this.ingredient = new Ingredient();
  }

  create() {
    this.ingredient = new Ingredient();
    this.createEdit = true;
  }

  edit() {
    this.ingredient = this.takenIngredient;
    this.createEdit = false;
  }

  submit() {
    if(this.createEdit == true)
      this.createIngredient();
    if(this.createEdit == false)
      this.editIngredient();
  }

  getIngredient() {
    this.ingredientService.getIngredient(this.inputIdIngredient).subscribe(response => {
      console.log(response);
      this.ingredient.id = response["id"];
      this.ingredient.name = response["name"];
      this.ingredient.vege = response["vege"];
      this.takenIngredient = this.ingredient;
    })
  }

  createIngredient() {
    this.ingredientService.createIngredient(this.ingredient).subscribe(response => {
      console.log(response);
    })
  }

  editIngredient() {
    this.ingredientService.putIngredient(this.ingredient).subscribe(response => {
      console.log(response);
    })
  }

  deleteIngredient() {
    this.ingredientService.deleteIngredient(this.inputIdIngredient).subscribe(response => {
      console.log(response);
    })
  }

}
