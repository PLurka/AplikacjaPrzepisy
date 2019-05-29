import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "./services/user.service";
import { Recipe } from "../recipe/recipe";
import { MatTableDataSource } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "./user";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  user: User;
  userId: number;
  userRecipes;
  spinner: boolean;
  dataSource;
  displayedColumns: string[] = ["title", "vege", "show"];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params["userId"]);
      this.spinner = true;
      this.userId = params["userId"];
      this.getUser(params["userId"]);
      // this.getRecipes(params["userId"]);
    });
  }

  getUser(userId: string) {
    this.userService.getUser(userId).subscribe(res => {
      this.user = new User();
      this.user.id = res["id"];
      this.user.username = res["username"];
      this.user.vege = res["vege"];
      this.spinner = false;
    });
  }

  editProfile() {
    //navigate to user-edit
  }

  navigateRecipe(recipeId: string) {
    this.router.navigate(["/recipe"], { queryParams: { id: recipeId } });
  }

  navigateForm() {
    this.router.navigate(["/new"], { queryParams: { typeForm: 1 } });
  }
}
