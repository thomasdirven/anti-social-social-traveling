import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Attraction } from '../attraction.model';
import { Trip } from '../trip.model';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent implements OnInit {
  public readonly attractionTypes = ['Historic Building', 'Park', 'Square', 'Museum', 'Other' ];

  public tripFG: FormGroup;
  @Output() public newTrip = new EventEmitter<Trip>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newFormGroup();    
  }

  newFormGroup() {
    this.tripFG = this.fb.group({
      city: ['Rome', [Validators.required, Validators.minLength(3)]],      
      // country: new FormControl('Rome'),
      // startDate: new FormControl('Rome'),
      // endDate: new FormControl('Rome'),
      // minDays: new FormControl('Rome'),
      // maxDays: new FormControl('Rome'),
      attractions: this.fb.array([this.createAttractions() ])
    });
  }

  createAttractions(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: [''],
      budget: ['']
    });
  }

  onSubmit() {
    console.log(this.tripFG);
    let attractions = this.tripFG.value.attractions.map(Attraction.fromJSON);
    attractions = attractions.filter(att => att.name.length > 2);
    //const attraction = new Attraction("Test", "Test", 5);
    const trip = new Trip(this.tripFG.value.city, 'UNKOWN', new Date(), new Date(Date.now() + 12096e5), 2, 5, attractions);
    console.log(trip);
    this.newTrip.emit(trip);

    // reset form with new form group after submit    
    this.newFormGroup();  
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
