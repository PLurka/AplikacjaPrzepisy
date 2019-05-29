import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isLogged: boolean;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated();
  }

  navigateRecipes() {
    this.router.navigate(["/recipes"]);
  }

  navigateForm() {
    this.router.navigate(["/new"], {
      queryParams: { typeForm: 1 }
    });
  }
}
