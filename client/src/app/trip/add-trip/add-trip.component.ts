import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Attraction } from '../attraction.model';
import { Trip } from '../trip.model';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {
  @Output() public newTrip = new EventEmitter<Trip>();
  constructor() { }

  ngOnInit(): void {
  }

  addTrip(tripCity: HTMLInputElement): boolean {
    console.log(tripCity.value);
    const attraction = new Attraction("Test", "Test", 5)
    const trip = new Trip(tripCity.value, 'UNKOWN', new Date(), new Date(Date.now() + 12096e5), 2, 5, [attraction]);
    console.log(trip);
    this.newTrip.emit(trip);
    return false;
  }

}
