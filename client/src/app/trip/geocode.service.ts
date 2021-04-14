import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {
  Observable,
  Subject,
  asapScheduler,
  pipe,
  of,
  from,
  interval,
  merge,
  fromEvent,
} from 'rxjs';
import { filter, catchError, tap, map, switchMap } from 'rxjs/operators';

export interface Location {
  city?: string;
  country?: string;
  lat: number;
  lng: number;
}

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class GeocodeService {
  private geocoder: any;

  constructor(private mapLoader: MapsAPILoader) {}

  private initGeocoder() {
    console.log('Init geocoder!');
    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if (!this.geocoder) {
      return from(this.mapLoader.load()).pipe(
        tap(() => this.initGeocoder()),
        map(() => true)
      );
    }
    return of(true);
  }

  geocodeAddress(location: string): Observable<Location> {
    console.log('Start geocoding!');
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable<Location>((observer) => {
          this.geocoder.geocode({ address: location }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              console.log('Geocoding complete!');
              console.log('Results - ', results, ' & Status - ', status);
              if (results.length === 1) {
                observer.next({
                  city: results[0].address_components[0].long_name,
                  country:
                  // if the last address_component is a number
                  // we take the second last instead and hope we have a country
                    isNaN(results[0].address_components[
                      results[0].address_components.length - 1
                    ].long_name) ? 
                    results[0].address_components[
                      results[0].address_components.length - 1
                    ].long_name :
                    results[0].address_components[
                      results[0].address_components.length - 2
                    ].long_name,
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng(),
                });
              } else {
                console.log('Too many results, cannot autocorrect');
              }
            } else {
              console.log('Error - ', results, ' & Status - ', status);
              observer.next({ city: '', country: '', lat: 0, lng: 0 });
            }
            observer.complete();
          });
        });
      })
    );
  }
}
