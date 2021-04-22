import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from './trip.model';

@Pipe({
  name: 'tripFilterCity',
  // Necessary for DOM changes
  // Didn't notice the differnce
  // turning it off for better performance
  // pure: false
})
export class TripFilterCityPipe implements PipeTransform {
  transform(trips: Trip[], city: string): Trip[] {
    if (!city || city.length === 0) {
      return trips;
    }
    return trips.filter((trip) =>
      trip.city.toLowerCase().includes(city.toLowerCase())
    );
  }
}
