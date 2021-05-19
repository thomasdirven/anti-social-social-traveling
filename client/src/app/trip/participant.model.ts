export interface ParticipantJson {
    // id: number;
    travelerId: number;
    tripId: number;
    goingStatus: number;
  }
  
  export class Participant {
    // private _id: number;
    constructor(
      private _travelerId: number,
      private _tripId: number,
      private _goingStatus: number,
    ) {}
  
    static fromJSON(json: ParticipantJson): Participant {
      const participant = new Participant(json.travelerId, json.tripId, json.goingStatus);
      // participant._id = json.id;
      return participant;
    }
  
    toJSON(): ParticipantJson {
      return <ParticipantJson> {
        travelerId: this.travelerId,
        tripId: this.tripId,
        goingStatus: this.goingStatus,
      };
    }
  
    // get id(): number {
    //   return this._id;
    // }
    get travelerId(): number {
      return this._travelerId;
    }
    get tripId(): number {
      return this._tripId;
    }
    get goingStatus(): number {
      return this._goingStatus;
    }
  }
  