import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  data: any;

  ngOnInit() {

  }

  onClickGetData() {
    // this.apiService.getData().subscribe(x => {
    //   console.log(x);
    //   this.data = x;
    // })
  }

}
