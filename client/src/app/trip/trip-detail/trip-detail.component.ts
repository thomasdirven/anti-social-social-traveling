import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../trip.model';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit {
  public trip: Trip;
  public isDeleted = false;
  public errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private _tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    // id will only get new value on page refresh => wrong methodology
    // const id = this.route.snapshot.paramMap.get('id');
    // better with subscribe to paramMap

    // this.route.paramMap.subscribe((pa) =>
    //   this._tripDataService
    //     .getTrip$(pa.get('id'))
    //     .pipe(
    //       catchError((err) => {
    //         this.errorMessage = err;
    //         return EMPTY;
    //       })
    //     )
    //     .subscribe((tr) => (this.trip = tr))
    // );

    this.route.data.subscribe(item => (this.trip = item['trip']));

    // stuff for restore trip - WORKS with observables
    this._tripDataService.restoredTrip$
      .pipe(
        tap(console.log),
        catchError((err) => {
          this.errorMessage = err;
          console.log(err);
          return EMPTY;
        })
      )
      .subscribe((restoredTrip) => (this.trip = restoredTrip));
  }

  deleteTrip() {
    this._tripDataService.deleteTrip(this.trip);
    this.isDeleted = true;
  }

  restoreTrip() {
    this._tripDataService.restoreTrip(this.trip);
    this.isDeleted = false;
  }

  addParticipant(code: number) {
    this.trip.addParticipant(code);
    this._tripDataService.updateTrip(this.trip);
  }

  isUserParticipant(code: number) {
    return this.trip.isUserParticipant(code);
  }

  giveNumberOfGoingStatusParticipants(code: number): number {
    return this.trip.participants.filter((par) => par.goingStatus == code)
      .length;
  }
}
