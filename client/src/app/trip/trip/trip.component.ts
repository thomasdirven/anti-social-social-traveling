import { Component, Input, OnInit } from '@angular/core';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../trip.model';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: [/*'../../app.component.scss',*/ './trip.component.scss' /* ,  */]
})
export class TripComponent implements OnInit {
  @Input() public trip: Trip;

  constructor(private _tripDataService: TripDataService) { }

  ngOnInit(): void {
  }

  deleteTrip() {
    this._tripDataService.deleteTrip(this.trip);
  }

}
