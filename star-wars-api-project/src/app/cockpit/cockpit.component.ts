import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  fightModes: string[];
  fightMode:  string;
  constructor(private apiService: ApiService) { }

  data: any;

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

  }
  onGetData() {
    const baseUrl = 'https://swapi.co/api/';



    this.apiService.getData(url).subscribe(x => {
      console.log(x);
      this.data = x;
    })
  }



}
