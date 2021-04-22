import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from './trip.model';

@Pipe({
  name: 'tripFilterDateRange',
  // Necessary for DOM changes
  // Yep you notice the difference
  // updates way too much and way too fast
  // TODO ?? optimazation with fewer reloads of this filter?
  pure: false,
})
export class TripFilterDateRangePipe implements PipeTransform {
  transform(trips: Trip[], dateRange: Date[]): Trip[] {
    if (
      !dateRange ||
      dateRange.length === 0 ||
      dateRange[0] === null ||
      dateRange[1] === null
    ) {
      console.log('geen date range');
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

