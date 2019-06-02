import { Recipe } from "../recipe/recipe";

export class User {
  id: string;
  username: string;
  vege: boolean;
  recipes? = new Array<Recipe>();
}
