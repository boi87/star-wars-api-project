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

  onNewGame() {
    this.p1Score = 0;
    this.p2Score = 0;
    this.fightModeSelected = null;
    this.heightVsLength = false;
    this.massVsCrew = false;
  }

  onSelectFightMode(event) {
    // this.onNewGame();

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
  }

  onGetData() {
    this.person = null;
    this.starship = null;

    this.p1Wins = false;
    this.p2Wins = false;

    this.loadingPeople = true;
    this.loadingStarship = true;

    this.apiService.getData().subscribe((data: any) => {

      console.log(data);

      this.peopleData = data[0];
      this.starshipData = data[1];

      this.person = this.peopleData.results[
        Math.floor(Math.random() * this.peopleData.results.length)
        ];

      // console.log("person", this.person);

      this.starship = this.starshipData.results[
        Math.floor(Math.random() * this.starshipData.results.length)
        ];

      this.onFight();
    });

  }

  onFight() {

    if ((this.massVsCrew)) {
      if (this.person.mass === 'unknown' || this.starship.crew === 'unknown') {
        console.log('UNK');
        this.onGetData();
      } else {

        // console.log(this.person.mass);
        // console.log(this.starship.crew);
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
        console.log('UNK');
        this.onGetData();
      } else {
        // console.log(this.person.height);
        // console.log(this.starship.length);
        if (+this.person.height > +this.starship.length) {
          console.log(+this.person.height > +this.starship.length);
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
