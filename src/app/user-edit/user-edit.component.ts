import { UserService } from "./../user/services/user.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MustMatch } from "../helpers/MustMatch";
import { MatSnackBar } from "@angular/material";
import { first } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { UserEditService } from "./services.ts/user-edit.service";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"]
})
export class UserEditComponent implements OnInit {
  diet: Diet;
  vege: string;
  spinner: boolean;

  editPasswordForm: FormGroup;
  editEmailForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userEditService: UserEditService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.editPasswordForm = this.formBuilder.group(
      {
        password: ["", [Validators.required]],
        confirmPassword: ["", [Validators.required]]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );

    this.editEmailForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    });
    this.spinner = true;
    this.getUser();
  }

  getUser() {
    this.userService
      .getUser(JSON.parse(localStorage.getItem("user"))["id"])
      .subscribe(response => {
        if (response["vege"] == true) this.vege = "Yes";
        else this.vege = "No";
        this.spinner = false;
      });
  }

  onEditDietSubmit() {
    this.diet = new Diet();
    if (this.vege == "Yes") this.diet.diet = true;
    else this.diet.diet = false;
    this.userEditService
      .putDiet(this.diet)
      .pipe(first())
      .subscribe(
        response => {
          this.snackBar.open("Successfully changed your diet!", "OK", {
            duration: 3000
          });
          this.getUser();
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.message, "OK", {
            duration: 3000
          });
        }
      );
  }

  onEditPasswordSubmit() {
    const password = this.editPasswordForm.value;
    this.userEditService
      .putPassword(password)
      .pipe(first())
      .subscribe(
        response => {
          this.snackBar.open("Successfully changed your password!", "OK", {
            duration: 3000
          });
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.message, "OK", {
            duration: 3000
          });
        }
      );
  }

  onEditEmailSubmit() {
    const email = this.editEmailForm.value;
    this.userEditService
      .putEmail(email)
      .pipe(first())
      .subscribe(
        response => {
          this.snackBar.open("Successfully changed your email!", "OK", {
            duration: 3000
          });
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.message, "OK", {
            duration: 3000
          });
        }
      );
  }
}

export class Diet {
  diet: boolean;
}
