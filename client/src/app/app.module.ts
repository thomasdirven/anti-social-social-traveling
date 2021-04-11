import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TripModule } from './trip/trip.module';

// Google API key
// AIzaSyByzFs-RMMy83HcDPftNNp_JddxVD4rurM

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    TripModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
