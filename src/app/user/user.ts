import { Recipe } from "../recipe/recipe";

export class User {
  id: string;
  name: string;
  vege: boolean;
  recipes? = new Array<Recipe>();
  // fridge?: Fridge;//do zrobienia Fridge
}
