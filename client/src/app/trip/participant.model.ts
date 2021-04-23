export interface ParticipantJson {
    id: number;
    userId: number;
    goingStatus: number;
  }
  
  export class Participant {
    private _id: number;
    constructor(
      private _userId: number,
      private _goingStatus: number,
    ) {}
  
    static fromJSON(json: ParticipantJson): Participant {
      const participant = new Participant(json.userId, json.goingStatus);
      participant._id = json.id;
      return participant;
    }
  
    toJSON(): ParticipantJson {
      return <ParticipantJson> {
        userId: this.userId,
        goingStatus: this.goingStatus,
      };
    }
  
    get id(): number {
      return this._id;
    }
    get userId(): number {
      return this._userId;
    }
    get goingStatus(): number {
      return this._goingStatus;
    }
  }
  