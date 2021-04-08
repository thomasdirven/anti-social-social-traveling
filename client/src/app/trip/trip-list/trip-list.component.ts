import { Component, OnInit } from '@angular/core';
import { TRIPS } from '../mock-trips';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {
  private _trips = TRIPS;

  constructor() { }

  get trips(){
    return this._trips;
  }

  ngOnInit(): void {
  }

}
