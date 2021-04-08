interface TripJson {
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  minDays: string;
  maxDays: string;
  attractions: string[];
}

export class Trip {
  // All the trips are potential cityTrips
  // You give the city and country
  // You give a start- and endDate for the period you are available to go
  // This is not the start and endDate of the actual trip (but it can be)
  // You give a minLength and maxLength (in days)

  constructor(
    private _city: string,
    private _country: string,
    private _startDate = new Date(),
    private _endDate = new Date(),
    private _minDays: number,
    private _maxDays: number,
    private _attractions = new Array<string>() // tourist Attractions you really want to do
  ) //TODO more attributes
  {}

  static fromJSON(json: TripJson): Trip {
    const minDays =
      typeof json.minDays === 'string' ? parseInt(json.minDays) : json.minDays;
    const maxDays =
      typeof json.maxDays === 'string' ? parseInt(json.maxDays) : json.maxDays;
    const trip = new Trip(
      json.city,
      json.country,
      new Date(json.startDate),
      new Date(json.endDate),
      minDays,
      maxDays,
      json.attractions
    );
    return trip;
  }

  get city(): string {
    return this._city;
  }
  get country(): string {
    return this._country;
  }
  get startDate(): Date {
    return this._startDate;
  }
  get endDate(): Date {
    return this._endDate;
  }
  get minDays(): number {
    return this._minDays;
  }
  get maxDays(): number {
    return this._maxDays;
  }
  get attractions(): string[] {
    return this._attractions;
  }

  addAttraction(name: string, type?: string, budget?: number) {
    this._attractions.push(`${type || 'other'} ${budget || 0} ${name}`);
  }
}
