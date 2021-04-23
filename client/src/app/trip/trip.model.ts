import { Attraction, AttractionJson } from './attraction.model';
import { Participant, ParticipantJson } from './participant.model';

interface TripJson {
  id: number;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  minDays: number;
  maxDays: number;
  latitude: number;
  longtitude: number;
  attractions: AttractionJson[];
  totalBudget: number;
  // participants: Map<User, number>;
  participants: ParticipantJson[];
  // participants: number;
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
    private _latitude: number,
    private _longtitude: number,
    private _totalBudget: number,
    // private _participants = new Map<User, number>(),
    // private _participants = new Map<string, string>(),
    private _participants = new Array<Participant>() // private _participants?: number,
  ) //TODO more attributes
  {}

  static fromJSON(json: TripJson): Trip {
    const minDays =
      typeof json.minDays === 'string' ? parseInt(json.minDays) : json.minDays;
    const maxDays =
      typeof json.maxDays === 'string' ? parseInt(json.maxDays) : json.maxDays;
    const latitude =
      typeof json.latitude === 'string'
        ? parseInt(json.latitude)
        : json.latitude;
    const longtitude =
      typeof json.longtitude === 'string'
        ? parseInt(json.longtitude)
        : json.longtitude;
    const totalBudget =
      typeof json.totalBudget === 'string'
        ? parseInt(json.totalBudget)
        : json.totalBudget;
    const trip = new Trip(
      json.city,
      json.country,
      new Date(json.startDate),
      new Date(json.endDate),
      minDays,
      maxDays,
      json.attractions.map(Attraction.fromJSON),
      latitude,
      longtitude,
      totalBudget,
      // new Map(JSON.parse(json.participants)),
      json.participants.map(Participant.fromJSON)
    );
    trip._id = json.id;
    return trip;
  }

  toJSON(): TripJson {
    return <TripJson>{
      city: this.city,
      country: this.country,
      startDate: this.startDate.toJSON(),
      endDate: this.endDate.toJSON(),
      minDays: this.minDays,
      maxDays: this.maxDays,
      attractions: this.attractions.map((att) => att.toJSON()),
      latitude: this.latitude,
      longtitude: this.longtitude,
      totalBudget: this.totalBudget,
      // participants: JSON.stringify([...this.participants]),
      participants: this.participants.map((par) => par.toJSON()),
    };
  }

  get id(): number {
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
  get latitude(): number {
    return this._latitude;
  }
  get longtitude(): number {
    return this._longtitude;
  }
  get totalBudget(): number {
    //TODO
    // what am i doing wrong, why do i need this for it to work??
    if (this._totalBudget > 0) return this._totalBudget;
    return null;
  }
  get participants(): Participant[] {
    return this._participants;
  }

  addAttraction(name: string, type?: string, budget?: number) {
    this._attractions.push(new Attraction(name, type, budget));
  }

  // TODO will change later
  addParticipant(code: number) {
    const userIdHere = 1;
    // this._participants.forEach(par => {
    //   if (par.userId == userIdHere){
    //     this._participants.indexOf(par);
    //   }});

    // remove previous goingStatus of this user
    this._participants = this._participants.filter(
      (par) => par.userId != userIdHere
    );

    // add new goingStatus of this user for this trip
    // this._participants.set(userId, code.toString());
    this._participants.push(new Participant(userIdHere, code));
  }  

  isUserParticipant(code: number) : boolean{
    const userIdHere = 1;
    let tempParticipants = this._participants.filter(
      (par) => par.userId == userIdHere && par.goingStatus == code
    );
    return tempParticipants.length == 1;
  }

}
