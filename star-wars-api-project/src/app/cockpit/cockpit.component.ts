import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {
  PeopleData,
  Person,
  StarshipData,
  Starship
} from '../models/models';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
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

  ngOnInit() {
    this.fightModes = ['Mass VS Crew', 'Height VS length'];

    this.p1Score = 0;
    this.p2Score = 0;
  }

  // set initial value for all variables
  onNewGame() {
    this.p1Score = 0;
    this.p2Score = 0;

    this.fightModeSelected = null;

    this.heightVsLength = false;
    this.massVsCrew = false;

    this.p1Wins = false;
    this.p2Wins = false;

    this.person = null;
    this.starship = null;
  }

  // set FightMode and re-initialize UI
  onSelectFightMode(event) {
    switch (event) {
      case 'Mass VS Crew':
        this.massVsCrew = true;
        this.heightVsLength = false;
        break;
      case 'Height VS length':
        this.massVsCrew = false;
        this.heightVsLength = true;
        break;
    }

    this.fightModeSelected = event;

    this.p1Wins = false;
    this.p2Wins = false;

    this.person = null;
    this.starship = null;
  }

  // call service to run API calls and return them simultaneously
  onGetData() {
    this.person = null;
    this.starship = null;

    this.p1Wins = false;
    this.p2Wins = false;

    this.loadingPeople = true;
    this.loadingStarship = true;

    this.apiService.getData().subscribe((data: any) => {

      // console.log(data);

      this.peopleData = data[0];
      this.starshipData = data[1];

      this.person = this.peopleData.results[
        Math.floor(Math.random() * this.peopleData.results.length)
        ];

      this.starship = this.starshipData.results[
        Math.floor(Math.random() * this.starshipData.results.length)
        ];

      this.onFight();
    });

  }

  // calculate winner based on different fight modes
  onFight() {

    if ((this.massVsCrew)) {
      if (this.person.mass === 'unknown' || this.starship.crew === 'unknown') {
        this.onGetData();
      } else {
        if (+this.person.mass > +this.starship.crew) {
          this.p1Wins = true;
          this.p1Score += 1;
        } else {
          this.p2Wins = true;
          this.p2Score += 1;
        }
      }
    } else {
      if (this.person.height === 'unknown' || this.starship.length === 'unknown') {
        this.onGetData();
      } else {
        if (+this.person.height > +this.starship.length) {
          this.p1Wins = true;
          this.p1Score += 1;
        } else {
          this.p2Wins = true;
          this.p2Score += 1;
        }
      }
    }
    this.loadingPeople = false;
    this.loadingStarship = false;
  }
}
