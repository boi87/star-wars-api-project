import {Component, OnInit} from "@angular/core";
import {ApiService} from "../services/api.service";
import {
  PeopleData,
  PeopleResult,
  StarshipData,
  StarshipResult
} from "../models/models";

@Component({
  selector: "app-cockpit",
  templateUrl: "./cockpit.component.html",
  styleUrls: ["./cockpit.component.css"]
})
export class CockpitComponent implements OnInit {
  fightModes: string[];
  fightModeSelected: string;

  constructor(private apiService: ApiService) {
  }

  loadingPeople: boolean;
  loadingStarship: boolean;

  person: PeopleResult;
  starship: StarshipResult;

  randomItem = Math.floor(Math.random() * 9);

  p1Wins = false;
  p2Wins = false;

  p1Score: number;
  p2Score: number;

  fighting = false;

  ngOnInit() {
    this.fightModes = ["Mass VS Crew", "Height VS length"];

    this.p1Score = 0;
    this.p2Score = 0;
  }

  newMatch() {
    this.person = null;
    this.starship = null;

    this.p1Wins = false;
    this.p2Wins = false;
    this.onGetLucky();
  }

  onNewGame() {
    this.p1Score = 0;
    this.p2Score = 0;

    this.newMatch();
  }

  onSelectFightMode(event) {
    this.onNewGame();
    this.fightModeSelected = event;
  }

  onGetLucky() {
    this.loadingPeople = true;
    this.loadingStarship = true;
    this.getPeopleResults();
    this.getStarshipResult();
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
      // console.log("person", this.person);
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
      // console.log("starship", this.starship);
      // this.onFight();
    });
  }

  onFight() {
    console.log(this.fightModeSelected);

    // this.fighting = true;
    if (this.person && this.starship) {
      if (this.fightModeSelected === "Mass VS Crew") {
        if (
          this.person.mass !== undefined &&
          this.starship.crew !== undefined
        ) {
          if (this.person.mass > this.starship.crew) {
            this.p1Wins = true;
            this.p1Score += 1;
            // this.fighting = false;
          } else {
            this.p2Wins = true;
            this.p2Score += 1;
            // this.fighting = false;
          }
        } else {
          this.newMatch();
        }
      } else {
        if (
          this.person.height !== undefined &&
          this.starship.length !== undefined
        ) {
          if (this.person.height > this.starship.length) {
            console.log(this.person.height);
            console.log(this.starship.length);
            console.log(this.person.height > this.starship.length);

            this.p1Wins = true;
            this.p1Score += 1;
            // this.fighting = false;
          } else {
            this.p2Wins = true;
            this.p2Score += 1;
            // this.fighting = false;
          }
        } else {
          this.newMatch();
        }
      }
    } else {
      this.newMatch();
    }

    // console.log(this.p1Score);
    // console.log(this.p2Score);
  }
}
