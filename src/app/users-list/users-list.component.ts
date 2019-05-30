import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UserService } from "../user/services/user.service";
import { User } from "../user/user";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"]
})
export class UsersListComponent implements OnInit {
  loggedUser;
  dataSource;
  users;
  spinner: boolean;
  actualPage: number;
  actualLimit: number;
  displayedColumns: string[] = ["id", "username", "vege", "show"];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.spinner = true;
    this.actualPage = 0;
    this.actualLimit = 10;
    this.getUsers();
  }

  prevPage() {
    if (this.actualPage > 0) this.actualPage -= 1;
    this.getUsers();
  }

  nextPage() {
    this.actualPage += 1;
    this.getUsers();
  }

  getUsers() {
    this.spinner = true;
    this.userService
      .getUsers(this.actualPage, this.actualLimit)
      .subscribe(res => {
        this.users = new Array<User>();
        console.log(res[0]);
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
        this.spinner = false;
      });
  }

  navigateUser(userId: number) {
    if (JSON.parse(localStorage.getItem("user"))["id"] == userId) {
      this.router.navigate(["/"]);
    } else {
      this.router.navigate(["/user"], {
        queryParams: {
          userId: userId
        }
      });
    }
  }
}
