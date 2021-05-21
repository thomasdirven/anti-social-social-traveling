import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Traveler } from 'src/app/user/traveler.model';
import { UserDataService } from 'src/app/user/user-data.service';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../trip.model';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit {
  // @Input() public loggedInTraveler: Traveler;
  private _fetchTraveler$: Observable<Traveler[]>;
  
  public trip: Trip;
  public isDeleted = false;
  public errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private _tripDataService: TripDataService,
    private _userDataService: UserDataService,
  ) {    
    this._fetchTraveler$ = this._userDataService.theLoggedInTraveler$.pipe(
      tap(console.log),
      catchError((err) => {
        this.errorMessage = err;
        console.log(err);
        return EMPTY;
      })
    );
  }

  get loggedInTraveler$(): Observable<Traveler[]> {
    return this._fetchTraveler$;
  }

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

    this.route.data.subscribe((item) => (this.trip = item['trip']));

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

  addParticipant(loggedInTraveler: Traveler, code: number) {
    let travelerName =
      loggedInTraveler.firstName + ' ' + loggedInTraveler.lastName;
    this.trip.addParticipant(
      loggedInTraveler.travelerId,
      travelerName,
      code
    );
    this._tripDataService.updateTrip(this.trip);
  }

  isUserParticipant(loggedInTraveler: Traveler, code: number) {
    return this.trip.isUserParticipant(loggedInTraveler.travelerId, code);
  }

  giveNumberOfGoingStatusParticipants(code: number): number {
    return this.trip.participants.filter((par) => par.goingStatus == code)
      .length;
  }

  isAnyoneGoing() : Boolean {
    return this.trip.participants.filter((par) => par.goingStatus != 0)
    .length != 0;
  }
}
