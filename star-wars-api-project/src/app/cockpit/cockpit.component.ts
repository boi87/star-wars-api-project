import {Component, OnInit} from "@angular/core";
import {ApiService} from "../services/api.service";
import {
  PeopleData,
  Person,
  StarshipData,
  Starship
} from "../models/models";

@Component({
  selector: "app-cockpit",
  templateUrl: "./cockpit.component.html",
  styleUrls: ["./cockpit.component.css"]
})
export class CockpitComponent implements OnInit {
  massVsCrew = false;
  heightVsLength = false;

  fightModes: string[];

  fightModeSelected: string;
  constructor(private apiService: ApiService) {
  }

  loadingPeople: boolean;
  loadingStarship: boolean;

  peopleData: PeopleData;
  starshipData: StarshipData;

  person: Person;

  starship: Starship;

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

  onNewGame() {
    this.p1Score = 0;
    this.p2Score = 0;
  }

  onSelectFightMode(event) {
    // this.onNewGame();

    switch (event) {
      case "Mass VS Crew":
        this.massVsCrew = true;
        this.heightVsLength = false;
        break;
      case "Height VS length":
        this.massVsCrew = false;
        this.heightVsLength = true;
        break;
    }

    console.log('massVsCrew', this.massVsCrew);
    console.log('heightVsLength', this.heightVsLength);
    this.fightModeSelected = event;
  }

  onGetData() {
    this.loadingPeople = true;
    this.loadingStarship = true;


    this.apiService.getData().subscribe((data: any) => {

      this.peopleData = data[0];
      this.starshipData = data[1];

      this.person = this.peopleData["results"][
        Math.floor(Math.random() * this.peopleData["results"].length)
        ];

      // console.log("person", this.person);

      this.starship = this.starshipData["results"][
        Math.floor(Math.random() * this.starshipData["results"].length)
        ];

      this.onFight();
    });

  }

  onFight() {
    console.log(this.fightModeSelected);

    if ((this.massVsCrew)) {
      if (this.person.mass === 'unknown' || this.starship.crew === 'unknown') {
        this.onGetData();
      } else {
        console.log('mass', this.person.mass);
        console.log('crew', this.starship.crew);
        if (this.person.mass > this.starship.crew) {
                  this.p1Wins = true;
                  this.p1Score += 1;
                  // this.fighting = false;
                } else {
                  this.p2Wins = true;
                  this.p2Score += 1;
                  // this.fighting = false;
                }
      }
    } else {
      if (this.person.height === 'unknown' || this.starship.length === 'unknown') {
        this.onGetData();
      } else {
        console.log('height', this.person.height);
        console.log('length', this.starship.length);

        if (this.person.height > this.starship.length) {
                  this.p1Wins = true;
                  this.p1Score += 1;
                  // this.fighting = false;
                } else {
                  this.p2Wins = true;
                  this.p2Score += 1;
                  // this.fighting = false;
                }
      }

    }

    // this.person = null;
    // this.starship = null;
    //
    // this.p1Wins = false;
    // this.p2Wins = false;

    this.loadingPeople = false;
    this.loadingStarship = false;
    // console.log(this.p1Score);
    // console.log(this.p2Score);
  }
}
