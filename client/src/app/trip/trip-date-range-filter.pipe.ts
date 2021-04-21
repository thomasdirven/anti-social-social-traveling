import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from './trip.model';

@Pipe({
  name: 'tripDateRangeFilter',
  // Necessary for DOM changes
  // Didn't notice the differnce
  // pure: false
})
export class TripDateRangeFilterPipe implements PipeTransform {
  transform(trips: Trip[], dateRange: Date[]): Trip[] {
    if (!dateRange || dateRange.length === 0) {
      console.log("geen date range")
      return trips;
    }
    console.log(dateRange[0]);
    console.log(dateRange[1]);
    return trips.filter(
      (trip) =>
        (trip.startDate >= dateRange[0] && trip.startDate < dateRange[1]) ||
        (trip.endDate > dateRange[0] && trip.startDate <= dateRange[1])
    );
  }
}
