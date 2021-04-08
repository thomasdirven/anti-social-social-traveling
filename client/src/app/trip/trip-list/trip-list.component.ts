import { Component, OnInit } from '@angular/core';
import { TRIPS } from '../mock-trips';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../trip.model'

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {
  
  constructor(private _tripDataService: TripDataService) { }

  get trips(): Trip[] {
    return this._tripDataService.trips;
  }

  addNewTrip(trip: Trip){
    this._tripDataService.addNewTrip(trip);
  }

  ngOnInit(): void {
  }

}
