import { Attraction, AttractionJson } from './attraction.model';

interface TripJson {
  id: number;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  minDays: number;
  maxDays: number;
  attractions: AttractionJson[];
}

export class Trip {
  // All the trips are potential cityTrips
  // You give the city and country
  // You give a start- and endDate for the period you are available to go
  // This is not the start and endDate of the actual trip (but it can be)
  // You give a minLength and maxLength (in days)

  private _id: number;
  constructor(
    private _city: string,
    private _country: string,
    private _startDate = new Date(),
    private _endDate = new Date(),
    private _minDays: number,
    private _maxDays: number,
    private _attractions = new Array<Attraction>(), // tourist Attractions you really want to do
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
      json.attractions.map(Attraction.fromJSON)
    );
    trip._id = json.id;
    return trip;
  }

  toJSON(): TripJson{
      return <TripJson>{
          city: this.city,
          country: this.country,
          startDate: this.startDate.toString(),
          endDate: this.endDate.toString(),
          minDays: this.minDays,
          maxDays: this.maxDays,
          attractions: this.attractions.map(att => att.toJSON())
      }
  }

  get id(): number{
    return this._id;
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
  get attractions(): Attraction[] {
    return this._attractions;
  }

  addAttraction(name: string, type?: string, budget?: number) {
    this._attractions.push(new Attraction(name, type, budget));
  }
}
