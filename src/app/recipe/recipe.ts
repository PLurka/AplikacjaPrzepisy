import { Ingredient } from "../ingredient/ingredient";
import { User } from "../user/user";

export class Recipe {
  id?: string;
  title: string;
  vege: boolean;
  description: string;
  ingredients = new Array<Ingredient>();
  user?: User;
}
