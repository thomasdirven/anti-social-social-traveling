export interface TravelerJson {
  travelerId: number;
  firstName: string;
  lastName: string;
  email: string;
}

export class Traveler {
  private _travelerId: number;
  constructor(
    private _firstName: string,
    private _lastName: string,
    private _email: string
  ) {}

  static fromJSON(json: TravelerJson): Traveler {
    const traveler = new Traveler(json.firstName, json.lastName, json.email);
    traveler._travelerId = json.travelerId;
    return traveler;
  }

  toJSON(): TravelerJson {
    return <TravelerJson>{
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
  }

  get travelerId(): number {
    return this._travelerId;
  }
  get firstName(): string {
    return this._firstName;
  }
  get lastName(): string {
    return this._lastName;
  }
  get email(): string {
    return this._email;
  }
}
