import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from './trip.model';

@Pipe({
  name: 'tripFilter',
  // Necessary for DOM changes
  // Didn't notice the differnce
  // pure: false
})
export class TripFilterPipe implements PipeTransform {

  transform(trips: Trip[], city: string): Trip[] {
    if (!city || city.length ===0){
      return trips;
    }
    return trips.filter(rec => 
      rec.city.toLowerCase().includes(city.toLowerCase())
    );
  }

}
