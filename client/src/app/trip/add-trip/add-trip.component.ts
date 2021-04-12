import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Attraction } from '../attraction.model';
import { Trip } from '../trip.model';

function validateAttractionName(control: FormGroup): { [key: string]: any } {
  if(
    control.get('budget').value.length >= 1 &&
    control.get('name').value.length < 2
  ) {
    return { budgetNoName: true };
  }
  return null;
}

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss'],
})
export class AddTripComponent implements OnInit {
  public readonly attractionTypes = [
    'Historic Building',
    'Park',
    'Square',
    'Museum',
    'Other',
  ];

  public tripFG: FormGroup;
  @Output() public newTrip = new EventEmitter<Trip>();
  constructor(private fb: FormBuilder) {}

  get attractions(): FormArray {
    return <FormArray>this.tripFG.get('attractions');
  }

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
      attractions: this.fb.array([this.createAttractions()]),
    });
    this.attractions.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((attList) => {
        // if the last entry's name is typed, add a new empty one
        // if we're removing an entry's name, and there is an empty one after that one, remove the empty one
        const lastElement = attList[attList.length - 1];
        if (lastElement.name && lastElement.name.length > 2) {
          this.attractions.push(this.createAttractions());
        }
      });
  }

  createAttractions(): FormGroup {
    return this.fb.group(
      {
        name: [''],
        type: [''],
        budget: [''],
      },
      { validator: validateAttractionName }
    );
  }

  onSubmit() {
    console.log(this.tripFG);
    let attractions = this.tripFG.value.attractions.map(Attraction.fromJSON);
    attractions = attractions.filter((att) => att.name.length > 2);
    //const attraction = new Attraction("Test", "Test", 5);
    const trip = new Trip(
      this.tripFG.value.city,
      'UNKOWN',
      new Date(),
      new Date(Date.now() + 12096e5),
      2,
      5,
      attractions
    );
    console.log(trip);
    this.newTrip.emit(trip);

    // reset form with new form group after submit
    this.newFormGroup();
  }

  getErrorMessages(errors: any): string {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'is required';
    } else if (errors.minlength) {
      return `needs at least ${errors.minlength.requiredLength}
        characters (got ${errors.minlength.actualLength})`;
    } else if (errors.budgetNoName) {
      return `if budget is set you must set a name`;
    }
  }
}
