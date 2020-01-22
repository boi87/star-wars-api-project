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
  fightMode: string;

  constructor(private apiService: ApiService) {
  }

  loadingPeople: boolean;
  loadingStarship: boolean;

  peopleResult: PeopleResult;
  starshipResult: StarshipResult;

  person: any[] = [];
  starship: any[] = [];

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
  }

  getPeopleResults() {
    this.apiService.getPeople().subscribe((data: PeopleData) => {
      const randomNum = Math.floor(Math.random() * 9);

      if (data) {
        this.loadingPeople = false;
        this.peopleResult = (data as PeopleData).results[randomNum];

        for(var key in this.peopleResult)
          this.person.push([key, this.peopleResult[key]]);

      }
      console.log("peopleResult", this.peopleResult);
    });
  }

  getStarshipResult() {
    this.apiService.getStarship().subscribe((data: StarshipData) => {
      const randomNum = Math.floor(Math.random() * 9);

      if (data) {
        this.loadingStarship = false;

        this.starshipResult = (data as StarshipData).results[randomNum];

        for(var key in this.starshipResult)
          this.starship.push([key, this.starshipResult[key]]);
      }

      console.log("starshipResult", this.starshipResult);
    });
  }
}
