import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import {
  PeopleData,
  PeopleResult,
  StarshipData,
  StarshipResult
} from "../models/models";
import { Observable } from "rxjs";

@Component({
  selector: "app-cockpit",
  templateUrl: "./cockpit.component.html",
  styleUrls: ["./cockpit.component.css"]
})
export class CockpitComponent implements OnInit {
  fightModes: string[];
  fightMode: string;

  constructor(private apiService: ApiService) {}

  loadingPeople: boolean;
  loadingStarship: boolean;

  person: PeopleResult;
  starship: StarshipResult;

  randomItem = Math.floor(Math.random() * 9);

  p1Score: number;
  p2Score: number;

  ngOnInit() {
    this.fightModes = ["Mass VS Crew", "Height VS length"];

    this.p1Score = 0;
    this.p2Score = 0;
  }

  onNewGame() {
    this.p1Score = 0;
    this.p2Score = 0;
  }

  onSelectFightMode(event) {
    this.onNewGame();
    this.fightMode = event;
  }

  onGetLucky() {
    this.loadingPeople = true;
    this.getPeopleResults();
    this.getStarshipResult();

    console.log(this.person && this.starship);


    if (this.person && this.starship) {
      console.log('hello');
    }
  }

  getPeopleResults() {
    // this.peopleObservable = this.apiService.getPeople();

    this.apiService.getPeople().subscribe((data: PeopleData) => {
      if (data) {
        this.loadingPeople = false;
        this.person =
          data["results"][
            this.randomItem < data["results"].length
              ? this.randomItem
              : data["results"].length - 1
          ];
      }
      console.log("person", this.person);
      this.onFight();
    });
  }

  getStarshipResult() {
    // this.starshipsObservable = this.apiService.getStarship();

    this.apiService.getStarship().subscribe((data: StarshipData) => {
      if (data) {
        this.loadingStarship = false;

        this.starship =
          data["results"][
            this.randomItem < data["results"].length
              ? this.randomItem
              : data["results"].length - 1
          ];
      }
      console.log("starship", this.starship);
      this.onFight();

    });
  }

  onFight() {
    if (this.person && this.starship) {
      console.log('here');
    }
    this.person = null;
    this.starship = null;
  }
}
