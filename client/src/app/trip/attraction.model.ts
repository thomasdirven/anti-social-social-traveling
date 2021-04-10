export interface AttractionJson {
  id: number;
  name: string;
  type: string;
  budget: number;
}

export class Attraction {
  private _id: number;
  constructor(
    private _name: string,
    private _type: string,
    private _budget: number
  ) {}

  static fromJSON(json: AttractionJson): Attraction {
    const budget =
      typeof json.budget === 'string' ? parseFloat(json.budget) : json.budget;
    const attraction = new Attraction(json.name, json.type, budget);
    attraction._id = json.id;
    return attraction;
  }

  toJSON(): AttractionJson {
    return <AttractionJson> {
      name: this.name,
      type: this.type,
      budget: this.budget,
    };
  }

  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get type(): string {
    return this._type;
  }
  get budget(): number {
    return this._budget;
  }
}
