import { Component, OnInit } from '@angular/core';
import { TRIPS } from '../mock-trips';
import { Trip } from '../trip.model'

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

  addNewTrip(trip: Trip){
    this._trips.push(trip);
  }

  ngOnInit(): void {
  }

}
