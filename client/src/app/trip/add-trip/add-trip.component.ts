import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Attraction } from '../attraction.model';
import { Trip } from '../trip.model';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {
  public tripFG: FormGroup;
  @Output() public newTrip = new EventEmitter<Trip>();
  constructor() { }

  ngOnInit(): void {
    this.tripFG = new FormGroup({
      city: new FormControl('Rome', [Validators.required, Validators.minLength(5)]),
      // country: new FormControl('Rome'),
      // startDate: new FormControl('Rome'),
      // endDate: new FormControl('Rome'),
      // minDays: new FormControl('Rome'),
      // maxDays: new FormControl('Rome'),
    })
  }

  onSubmit(): boolean {
    console.log(this.tripFG);
    const attraction = new Attraction("Test", "Test", 5)
    const trip = new Trip(this.tripFG.value.city, 'UNKOWN', new Date(), new Date(Date.now() + 12096e5), 2, 5, [attraction]);
    console.log(trip);
    this.newTrip.emit(trip);
    return false;
  }

  getErrorMessages(errors: any): string {
    if (errors.required) {
      return "is required";
    } else if (errors.minlength) {
      return `needs at least ${errors.minlength.requiredLength}
        characters (got ${errors.minlength.actualLength})`
    }
  }

}
