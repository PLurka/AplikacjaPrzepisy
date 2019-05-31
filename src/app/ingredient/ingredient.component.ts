import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from './ingredient';
import { IngredientService } from './services/ingredient.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  input: string;
  ingredients = new Array<Ingredient>();
  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
  }

  @Output()
  eventIngredient = new EventEmitter<object>();

  addIngredient(ingredient: Ingredient){
    console.log(ingredient);
    this.eventIngredient.emit(ingredient);
  }

  searchIngredients(input: string){
    this.ingredientService.searchIngredients(input).subscribe(res => {
      console.log(res);
      this.ingredients = res["results"];
      console.log(this.ingredients);
    });
  }

}
