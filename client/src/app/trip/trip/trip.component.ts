import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../trip.model';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['../../app.component.scss', './trip.component.scss' /* ,  */]
})
export class TripComponent implements OnInit {
  @Input() public trip: Trip;

  constructor() { }

  ngOnInit(): void {
  }

}
