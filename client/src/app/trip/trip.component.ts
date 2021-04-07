import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['../app.component.css', './trip.component.css' /* ,  */]
})
export class TripComponent implements OnInit {
  // All the trips are potential cityTrips
  // You give the city and country
  // You give a start- and endDate for the period you are available to go
  // This is not the start and endDate of the actual trip (but it can be)
  // You give a minLength and maxLength (in days)  
  
  city: string;
  country: string;
  startDate: Date;
  endDate: Date;
  minDays: number;
  maxDays: number;
  //TODO more attributes

  constructor() { 
    this.city = "Barcelona";
    this.country = "Spain";
    this.startDate = new Date();
    this.endDate = new Date(Date.now() + 12096e5);
    this.minDays = 3;
    this.maxDays = 8;
  }

  ngOnInit(): void {
  }

}
