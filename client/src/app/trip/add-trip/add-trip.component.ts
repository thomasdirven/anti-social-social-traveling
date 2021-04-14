import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Attraction } from '../attraction.model';
import { GeocodeService } from '../geocode.service';
import { Trip } from '../trip.model';
import { Location } from '../geocode.service';

function validateAttractionName(control: FormGroup): { [key: string]: any } {
  if (
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

  private location: Location;

  public tripFG: FormGroup;
  @Output() public newTrip = new EventEmitter<Trip>();
  constructor(
    private fb: FormBuilder,
    private geocodeService: GeocodeService,
    private ref: ChangeDetectorRef
  ) {}

  get attractions(): FormArray {
    return <FormArray>this.tripFG.get('attractions');
  }
  get startDate(): FormControl {
    return <FormControl>this.tripFG.get('startDate');
  }
  get endDate(): FormControl {
    return <FormControl>this.tripFG.get('endDate');
  }
  get minDays(): FormControl {
    return <FormControl>this.tripFG.get('minDays');
  }
  get maxDays(): FormControl {
    return <FormControl>this.tripFG.get('maxDays');
  }

  ngOnInit(): void {
    this.newFormGroup();
  }

  private _startDateStr: string;
  private _endDateStr: string;
  private _maxDaysForDateRange: number;

  calcDateRange(startDateStr: string, endDateStr: string) {
    let startDate = new Date(startDateStr);
    let endDate = new Date(endDateStr);
    console.log("startDate + startDateStr");
    console.log(startDate);
    console.log(startDateStr);
    console.log("endDate + endDateStr");
    console.log(endDate);
    console.log(endDateStr);
    let diff = endDate.getTime() - startDate.getTime();
    console.log(Math.floor(diff / (60 * 60 * 24 * 1000)));
    this._maxDaysForDateRange = Math.floor(diff / (60 * 60 * 24 * 1000));
  }

  newFormGroup() {
    this.tripFG = this.fb.group({
      city: ['Rome', [Validators.required, Validators.minLength(3)]],
      country: ['Italy', [Validators.required, Validators.minLength(3)]],
      startDate: [''],
      endDate: [''],
      minDays: [{value: '', disabled: true}],
      maxDays: [{value: '', disabled: true}],
      attractions: this.fb.array([this.createAttractions()]),
    });
    // "Minimum duration in Days - Maximum duration in Days" starts off disabled.
    // When the date range is filled in, the minDays field is enabled.
    // The minDays is at least 1 and can never exceed the date range.
    // When the minDays field is filled in, the maxDays field is enabled.
    // The maxDays is at least minDays and can never exceed the date range.
    // Took me a while, but it's a nice extra I hope.
    this.startDate.valueChanges.subscribe(hasValue => {
      if (hasValue) {
        console.log(hasValue);
        this._startDateStr =  hasValue;
      } 
    });
    this.endDate.valueChanges.subscribe(hasValue => {
      if (hasValue) {
        console.log(hasValue);
        this._endDateStr = hasValue;
        this.calcDateRange(this._startDateStr, this._endDateStr);
        this.minDays.enable();
        this.minDays.setValidators([Validators.required, Validators.min(1),
          Validators.max(this._maxDaysForDateRange)]);
      } else {
        this.minDays.setValidators(null);
        this.maxDays.setValidators(null);
        this.minDays.reset();
        this.minDays.disable();
        this.maxDays.reset();
        this.maxDays.disable();
      }
      this.maxDays.updateValueAndValidity();
    });
    this.minDays.valueChanges.subscribe(hasValue => {
      if (hasValue) {
        this.maxDays.enable();
        this.maxDays.setValidators([Validators.required, Validators.min(this.minDays.value),
          Validators.max(this._maxDaysForDateRange)]);
      } else {
        this.maxDays.setValidators(null);
        this.maxDays.reset();
        this.maxDays.disable();
      }
      this.maxDays.updateValueAndValidity();
    });
    this.attractions.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((attList) => {
        // if the last entry's name is typed, add a new empty one
        // if we're removing an entry's name, and there is an empty one after that one, remove the empty one
        const lastElement = attList[attList.length - 1];
        if (lastElement.name && lastElement.name.length > 2) {
          this.attractions.push(this.createAttractions());
        } else if (attList.length >= 2) {
          const secondToLast = attList[attList.length - 2];
          if (
            !lastElement.name &&
            !lastElement.type &&
            !lastElement.budget &&
            (!secondToLast.name || secondToLast.name.length < 2)
          ) {
            this.attractions.removeAt(this.attractions.length - 1);
          }
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
    this.geocodeOnSubmit();
  }

  private _location: Location;

  geocodeOnSubmit() {
    this.geocodeService
      .geocodeAddress(`${this.tripFG.value.city}, ${this.tripFG.value.country}`)
      .subscribe((location: Location) => {
        this.location = location;
        this.ref.detectChanges();
        this.emitTripWithCoord(location);
      });
  }

  emitTripWithCoord(location: Location) {
    console.log(location.lat, location.lng);
    this.location = location;
    let attractions = this.tripFG.value.attractions.map(Attraction.fromJSON);
    attractions = attractions.filter((att) => att.name.length > 2);
    //const attraction = new Attraction("Test", "Test", 5);
    const trip = new Trip(
      this.tripFG.value.city,
      this.tripFG.value.country,
      new Date(this.tripFG.value.startDate),
      new Date(this.tripFG.value.endDate),
      this.tripFG.value.minDays,
      this.tripFG.value.maxDays,
      attractions,
      this.location.lat,
      this.location.lng
    );
    console.log(trip);
    this.newTrip.emit(trip);

    // reset form with new form group after submit
    this.newFormGroup();
    //this.tripFG.markAsUntouched();
    //this.tripFG.get('maxDays').markAsUntouched();
    //this.tripFG.reset(this.tripFG.getRawValue(), {emitEvent: false});
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
