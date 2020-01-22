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

  peopleData: PeopleData;
  starshipsData: StarshipData;

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
  }

  getPeopleResults() {
    this.apiService.getPeople().subscribe((data: any) => {

      if (data) {
        this.loadingPeople = false;
        this.peopleData = data['results'];

      }
      console.log("peopleData", this.peopleData);
    });
  }

  getStarshipResult() {
    this.apiService.getStarship().subscribe((data: any) => {

      if (data) {
        this.loadingStarship = false;

        this.starshipsData = data['results'];
      }

      console.log("starshipsData", this.starshipsData);
    });
  }
}
