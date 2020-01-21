import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {PeopleScore, StarshipScore} from '../models/models';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  fightModes: string[];
  fightMode: string;

  constructor(private apiService: ApiService) {
  }

  loading: boolean;
  player1Score: PeopleScore | StarshipScore;
  player2Score: PeopleScore | StarshipScore;

  ngOnInit() {
    this.fightModes = ['Mass VS Crew', 'Height VS length'];
  }

  onNewGame() {
    console.log('newgame');
  }

  onSelectFightMode(event) {
    console.log(event);
    this.fightMode = event;
  }

  onGetLucky() {
    this.loading = true;
    this.apiService.getData().subscribe((data: (PeopleScore | StarshipScore)[]) => {
      const randomNum = Math.floor(Math.random() * 2);

      if (data && data.length) {
        this.loading = false;

        this.player1Score = data[randomNum];
        this.player2Score = data[randomNum === 0 ? 1 : 0];

        console.log(this.player2Score);
        console.log(this.player1Score);


      }
      console.log(data);
      // this.data = x;
    })
  }


}
