import { Ingredient } from "../ingredient/ingredient";

export class Recipe {
  id?: string;
  title: string;
  vege: boolean;
  description: string;
  ingredients = new Array<Ingredient>();
  user?: object;
}
