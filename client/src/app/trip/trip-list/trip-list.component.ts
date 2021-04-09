import { Component, OnInit } from '@angular/core';
import { TRIPS } from '../mock-trips';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../trip.model';
import { Subject, Observable, of, EMPTY, merge } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  map,
  filter,
  catchError,
  scan,
  tap,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
})
export class TripListComponent implements OnInit {
  public filterTripCity: string;
  public filterTrip$ = new Subject<string>();
  constructor(private _tripDataService: TripDataService) {
    this.filterTrip$
      .pipe(distinctUntilChanged(), debounceTime(150))
      .subscribe((val) => (this.filterTripCity = val));
  }

  applyFilter(filter: string) {
    this.filterTripCity = filter;
  }

  get trips(): Trip[] {
    return this._tripDataService.trips;
  }

  addNewTrip(trip: Trip) {
    this._tripDataService.addNewTrip(trip);
  }

  ngOnInit(): void {}
}
