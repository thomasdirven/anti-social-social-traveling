import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GeocodeService } from '../geocode.service';
import { Location } from '../geocode.service';
import { GmapComponent } from '../gmap/gmap.component'

@Component({
  selector: 'app-geocode',
  templateUrl: './geocode.component.html',
  styleUrls: ['./geocode.component.scss']
})
export class GeocodeComponent implements OnInit {

  // This component could be removed, not used right now

  address = 'Dortmund';
  location: Location;
  loading: boolean;

  constructor(
    private geocodeService: GeocodeService,
    private ref: ChangeDetectorRef,
  ) {}
  
  ngOnInit() {
  }

  showLocation(address: string) {
    this.address = address;
    this.addressToCoordinates();
  }

  addressToCoordinates() {
    this.loading = true;
    this.geocodeService.geocodeAddress(this.address)
    .subscribe((location: Location) => {
        this.location = location;
        this.loading = false;
        this.ref.detectChanges();
        // this.addNewMarker(location);
      }      
    );     
  }

  // addNewMarker(location: Location) {
  //   GmapComponent.addNewMarker(location.lat, location.lng);
  // }

}
