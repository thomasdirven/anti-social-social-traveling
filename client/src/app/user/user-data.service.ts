import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Traveler } from './traveler.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private _traveler: Traveler[];
  private _traveler$ = new BehaviorSubject<Traveler[]>([]);

  constructor(private http: HttpClient) {
    this.loggedInTraveler$.subscribe((traveler: Traveler[]) => {
      this._traveler = traveler;
      this._traveler$.next(this._traveler);
    });
  }

  get theLoggedInTraveler$(): Observable<Traveler[]> {
    return this._traveler$;
  }

  // I know I'm only getting ONE traveler but I need an array
  // for the BehavoirSubject beacuse if I cannot
  // use a BehaviorSubject I have to refresh my page "All Trips"
  // every single time if I want to see the trips
  // if you know the solution to this, please let me know
  get loggedInTraveler$(): Observable<Traveler[]> {
    return this.http.get(`${environment.apiUrl}/traveler/`).pipe(
      shareReplay(1),
      catchError(this.handleError),
      map((list: any[]): Traveler[] => list.map(Traveler.fromJSON))
    );
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err instanceof HttpErrorResponse) {
      errorMessage = `"${err.status} ${err.statusText}" when accessing "${err.url}"`;
    } else {
      errorMessage = `an unknown error occurred ${err}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}

// Original implementation with Subject instead of BehavoirSubject

// export class UserDataService {
//   private _traveler: Traveler;
//   private _traveler$ = new Subject<Traveler>();

//   constructor(private http: HttpClient) {
//     this.loggedInTraveler$.subscribe((traveler: Traveler) => {
//       this._traveler = traveler;
//       this._traveler$.next(this._traveler);
//     });
//   }

//   get theLoggedInTraveler$(): Observable<Traveler> {
//     return this._traveler$;
//   }

//   get loggedInTraveler$(): Observable<Traveler> {
//     return this.http
//       .get(`${environment.apiUrl}/traveler/`)
//       .pipe(
//         shareReplay(1),
//         catchError(this.handleError),
//         map(Traveler.fromJSON),
//       );
//   }

//   handleError(err: any): Observable<never> {
//     let errorMessage: string;
//     if (err instanceof HttpErrorResponse) {
//       errorMessage = `"${err.status} ${err.statusText}" when accessing "${err.url}"`;
//     } else {
//       errorMessage = `an unknown error occurred ${err}`;
//     }
//     console.error(err);
//     return throwError(errorMessage);
//   }
// }
