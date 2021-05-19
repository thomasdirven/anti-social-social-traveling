import { Component, Input, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Traveler } from 'src/app/user/traveler.model';
import { UserDataService } from 'src/app/user/user-data.service';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../trip.model';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: [/*'../../app.component.scss',*/ './trip.component.scss' /* ,  */],
})
export class TripComponent implements OnInit {
  @Input() public trip: Trip;
  @Input() public loggedInTraveler: Traveler;
  // public numberOfMaybeGoingParticipants: number;

  constructor(private _tripDataService: TripDataService) {}

  ngOnInit(): void {}

  addParticipant(code: number) {
    let travelerName =
      this.loggedInTraveler.firstName + ' ' + this.loggedInTraveler.lastName;
    this.trip.addParticipant(
      this.loggedInTraveler.travelerId,
      travelerName,
      code
    );
    this._tripDataService.updateTrip(this.trip);
  }

  isUserParticipant(code: number) {
    return this.trip.isUserParticipant(this.loggedInTraveler.travelerId, code);
  }

  giveNumberOfGoingStatusParticipants(code: number): number {
    return this.trip.participants.filter((par) => par.goingStatus == code)
      .length;
  }
}
