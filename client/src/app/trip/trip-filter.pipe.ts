import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripFilter'
})
export class TripFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
