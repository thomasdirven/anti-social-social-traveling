import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from './trip.model';

@Pipe({
  name: 'tripFilterCountry',
  // Necessary for DOM changes
  // Didn't notice the differnce
  // turning it off for better performance
  // pure: false
})
export class TripFilterCountryPipe implements PipeTransform {
  transform(trips: Trip[], country: string): Trip[] {
    if (!country || country.length === 0) {
      return trips;
    }
    return trips.filter((trip) =>
      trip.country.toLowerCase().includes(country.toLowerCase())
    );
  }
}
