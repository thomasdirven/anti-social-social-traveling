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
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  throttleTime,
} from 'rxjs/operators';
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
    'Museum',
    'Park',
    'Square',
    'Event',
    'Other',
  ];

  public tripFG: FormGroup;

  @Output() public newTrip = new EventEmitter<Trip>();

  constructor(
    private fb: FormBuilder,
    private geocodeService: GeocodeService,
    private ref: ChangeDetectorRef
  ) {}

  private _startDateStr: string;
  private _endDateStr: string;
  private _maxDaysForDateRange: number;

  // prevents city from calling geocode to early
  private _typingInCountry = true;

  private _cityCallsGeocoder = false;
  private _countryCallsGeocoder = false;

  public isCheckedLocationAutocorrect = true;
  private _autoCorrectCity = false;
  private _autoCorrectCountry = false;

  // private _dbTime = 5000;
  public validLocation = false;
  // in the begining the location is nor valid nor invalid
  // need this for the mat-progress-bar
  public invalidLocation = false;

  private _location: Location;

  get city(): FormControl {
    return <FormControl>this.tripFG.get('city');
  }
  get country(): FormControl {
    return <FormControl>this.tripFG.get('country');
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
  get attractions(): FormArray {
    return <FormArray>this.tripFG.get('attractions');
  }

  ngOnInit(): void {
    this.newFormGroup();
  }

  calcDateRange(startDateStr: string, endDateStr: string): number {
    let startDate = new Date(startDateStr);
    let endDate = new Date(endDateStr);
    console.log('startDate + startDateStr');
    console.log(startDate);
    console.log(startDateStr);
    console.log('endDate + endDateStr');
    console.log(endDate);
    console.log(endDateStr);
    let diff = endDate.getTime() - startDate.getTime();
    console.log(Math.floor(diff / (60 * 60 * 24 * 1000)) + ' + 1');
    return Math.floor(diff / (60 * 60 * 24 * 1000)) + 1;
  }

  newFormGroup() {
    this.tripFG = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', [Validators.required, Validators.minLength(2)]],
      startDate: [''],
      endDate: [''],
      minDays: [{ value: '', disabled: true }],
      maxDays: [{ value: '', disabled: true }],
      attractions: this.fb.array([this.createAttractions()]),
    });
    // After city and country have been filled in, we wait 5 seconds
    // We wait this long so the user has time to correct spelling mistakes
    // We don't want to send API requests every 50ms, don't waste money
    // After the 5 seconds wait, we try to geocode the location given by the user
    // If the geocoding fails (returns lat: 0, lng: 0) we tell him/her
    // that the location does not exist (according to google's geocoding API)
    // TODO - variable debouncTime
    // When geocoding was succesful we only debounce for 50ms
    // debounceTime(this._geocodeSuccces ? 50 : 5000) didnt work
    // this might help
    // https://stackoverflow.com/questions/42070554/variable-debouncetime-based-on-conditions
    // this might be better => .throttleTime
    // https://stackoverflow.com/questions/56460436/what-is-the-difference-between-throttletime-vs-debouncetime-in-rxjs-and-when-to
    // throttleTime in geocode.service.ts
    this.city.valueChanges
      .pipe(
        debounceTime(2000),
        distinctUntilChanged()
        // throttleTime(9000),
      )
      .subscribe((hasValue) => {
        if (
          !this._autoCorrectCity &&
          hasValue &&
          hasValue.length > 2 &&
          this.country.value &&
          !this._typingInCountry &&
          !this._countryCallsGeocoder
        ) {
          this._cityCallsGeocoder = true;
          console.log(hasValue);
          console.log(this.country.value);
          this.invalidLocation = false;
          this.validLocation = false;
          console.log('city calls geocoder');
          this.geocodeLocationToCoord(false);
        } else {
          console.log('city.value too short or geocode autocorrect cycle');
          // reset autoCorrectCity to false so user can change city or country if he whishes
          if (this._autoCorrectCity) {
            this._autoCorrectCity = false;
            // this._dbTime = 5000;
          } else {
            this.validLocation = false;
          }
        }
      });
    this.country.valueChanges
      .pipe(
        debounceTime(2000),
        distinctUntilChanged()
        // throttleTime(9000),
      )
      .subscribe((hasValue) => {
        if (
          !this._autoCorrectCountry &&
          hasValue &&
          hasValue.length > 1 &&
          this.city.value &&
          !this._cityCallsGeocoder
        ) {
          this._typingInCountry = false; // done typing
          this._countryCallsGeocoder = true;
          console.log(hasValue);
          console.log(this.city.value);
          this.invalidLocation = false;
          this.validLocation = false;
          console.log('country calls geocoder');
          this.geocodeLocationToCoord(false);
        } else {
          console.log('country.value too short or geocode autocorrect cycle');
          // reset autoCorrectCountry to false so user can change city or country if he whishes
          if (this._autoCorrectCountry) {
            this._autoCorrectCountry = false;
            // this._dbTime = 5000;
          } else {
            this.validLocation = false;
          }
        }
      });
    // If autoCorrect was turned off and the location was not found by google
    // the user can enable autocorrect, then without changing the fields,
    // a new geocode api request will be send
    // this.isCheckedLocationAutocorrect;

    // "Minimum duration in Days - Maximum duration in Days" starts off disabled.
    // When the date range is filled in, the minDays field is enabled.
    // The minDays is at least 1 and can never exceed the date range.
    // When the minDays field is filled in, the maxDays field is enabled.
    // The maxDays is at least minDays and can never exceed the date range.
    // Took me a while, but it's a nice extra I hope.
    this.startDate.valueChanges.subscribe((hasValue) => {
      if (hasValue) {
        console.log(hasValue);
        this._startDateStr = hasValue;
      }
    });
    this.endDate.valueChanges.subscribe((hasValue) => {
      if (hasValue) {
        console.log(hasValue);
        this._endDateStr = hasValue;
        this._maxDaysForDateRange = this.calcDateRange(
          this._startDateStr,
          this._endDateStr
        );
        this.minDays.enable();
        this.minDays.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(this._maxDaysForDateRange),
        ]);
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
    this.minDays.valueChanges.subscribe((hasValue) => {
      if (hasValue) {
        this.maxDays.enable();
        this.maxDays.setValidators([
          Validators.required,
          Validators.min(this.minDays.value),
          Validators.max(this._maxDaysForDateRange),
        ]);
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
    if (!this._location) {
      this.geocodeLocationToCoord(true);
    } else {
      this.emitTripWithCoord();
    }
  }

  geocodeLocationToCoord(isSubmit: boolean) {
    this.geocodeService
      .geocodeAddress(`${this.tripFG.value.city}, ${this.tripFG.value.country}`)
      // .pipe(throttleTime(9000))
      .subscribe((location: Location) => {
        this.ref.detectChanges();
        this._location = location;
        console.log('geocode finished');
        // autocorrect if google finds your misspelled location
        if (this._location.lat !== 0 && this.isCheckedLocationAutocorrect) {
          if (this._location.city !== this.city.value) {
            this.city.setValue(this._location.city);
            this._autoCorrectCity = true;
            // this._dbTime = 50;
          }
          if (this._location.country !== this.country.value) {
            this.country.setValue(this._location.country);
            this._autoCorrectCountry = true;
            // this._dbTime = 50;
          }
        }
        if (
          this._location.city === this.city.value &&
          this._location.country === this.country.value
        ) {
          this.validLocation = true;
          this.invalidLocation = false;
          console.log('valid location');
        } else {
          this.validLocation = false;
          this.invalidLocation = true;
          console.log('invalid location');
        }
        if (this._cityCallsGeocoder) {
          this._cityCallsGeocoder = false;
        }
        if (this._countryCallsGeocoder) {
          this._countryCallsGeocoder = false;
        }
        if (isSubmit) {
          this.emitTripWithCoord();
        }
      });
  }

  emitTripWithCoord() {
    console.log(this._location.lat, this._location.lng);
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
      this._location.lat,
      this._location.lng
    );
    console.log(trip);
    this.newTrip.emit(trip);

    // reset fields
    this._startDateStr = '';
    this._endDateStr = '';
    this._maxDaysForDateRange = 1;
    this._typingInCountry = true;
    this._autoCorrectCity = false;
    this._autoCorrectCountry = false;
    this.validLocation = false;
    this.invalidLocation = false;
    this._location = null;

    // TODO fix form reset
    // reset form with new form group after submit
    // this.newFormGroup();
    this.tripFG.reset();
    this.tripFG.updateValueAndValidity();
    this.tripFG.markAsPristine();
    this.tripFG.markAsUntouched();
    this.tripFG.updateValueAndValidity();
    //this.tripFG.get('maxDays').markAsUntouched();
    this.tripFG.reset(this.tripFG.getRawValue(), { emitEvent: false });
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
