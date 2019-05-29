import { Component, OnInit } from "@angular/core";
import { Ingredient } from "../ingredient/ingredient";

@Component({
  selector: "app-fridge",
  templateUrl: "./fridge.component.html",
  styleUrls: ["./fridge.component.css"]
})
export class FridgeComponent implements OnInit {
  spinner: boolean;
  fridge: Ingredient[];
  constructor() {}

  ngOnInit() {
    this.spinner = true;
  }
}
