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

  // randomItem = Math.floor(Math.random() * 9);

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
    this.onGetData();
  }

  onNewGame() {
    this.p1Score = 0;
    this.p2Score = 0;

    this.newMatch();
  }

  onSelectFightMode(event) {
    // this.onNewGame();
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

      console.log('person', this.person);
      console.log('starship', this.starship);

      this.onFight();
    });

  }

  onFight() {
    console.log(this.fightModeSelected);

    if ((this.fightModeSelected === "Mass VS Crew")) {
      if (this.person.mass === 'unknown' || this.starship.crew === 'unknown') {
        this.onGetData();


      } else {
        console.log('mass', this.person.mass);
        console.log('crew', this.starship.crew);
      }
    } else {
      if (this.person.height === 'unknown' || this.starship.length === 'unknown') {
        this.onGetData();


      } else {

        console.log('height', this.person.height);
        console.log('length', this.starship.length);
      }

    }


    //   if (this.fightModeSelected === "Mass VS Crew") {
    //     if (
    //       this.person.mass !== undefined &&
    //       this.starship.crew !== undefined
    //     ) {
    //       if (this.person.mass > this.starship.crew) {
    //         this.p1Wins = true;
    //         this.p1Score += 1;
    //         // this.fighting = false;
    //       } else {
    //         this.p2Wins = true;
    //         this.p2Score += 1;
    //         // this.fighting = false;
    //       }
    //     } else {
    //       this.newMatch();
    //     }
    //   } else {
    //     if (
    //       this.person.height !== undefined &&
    //       this.starship.length !== undefined
    //     ) {
    //       if (this.person.height > this.starship.length) {
    //         console.log(this.person.height);
    //         console.log(this.starship.length);
    //         console.log(this.person.height > this.starship.length);
    //
    //         this.p1Wins = true;
    //         this.p1Score += 1;
    //         // this.fighting = false;
    //       } else {
    //         this.p2Wins = true;
    //         this.p2Score += 1;
    //         // this.fighting = false;
    //       }
    //     } else {
    //       this.newMatch();
    //     }
    //   }
    // } else {
    //   this.newMatch();
    // }

    this.loadingPeople = false;
    this.loadingStarship = false;
    // console.log(this.p1Score);
    // console.log(this.p2Score);
  }
}
