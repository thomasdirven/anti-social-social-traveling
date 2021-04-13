import { Component, NgZone, OnInit } from '@angular/core';
import { TripDataService } from '../trip-data.service';
// No longer used in latest version of agm -> using googl.maps
//import { MouseEvent } from '@agm/core';

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss'],
})
export class GmapComponent implements OnInit {
  constructor(private zone: NgZone) {}

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: google.maps.MouseEvent): void {
    GmapComponent.markers.push({
      lat: $event.latLng.lat(),
      lng: $event.latLng.lng(),
      draggable: true,
    });
  }

  markerDragEnd(m: marker, $event: google.maps.MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  public static markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true,
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false,
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true,
    },
  ];

  ngOnInit(): void {}

  map: google.maps.Map;
  mapClickListener;

  public mapReadyHandler(map: google.maps.Map): void {
    this.map = map;
    this.mapClickListener = this.map.addListener(
      'click',
      (e: google.maps.MouseEvent) => {
        this.zone.run(() => {
          // Here we can get correct event
          console.log(e.latLng.lat(), e.latLng.lng());
        });
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.mapClickListener) {
      this.mapClickListener.remove();
    }
  }

  public static addNewMarker(lat, lng) {
    this.markers = [...this.markers, 
      {
        lat: lat,
        lng: lng,
        label: 'D',
        draggable: false,
      }];
  }  

  get staticMarkers() {
    return GmapComponent.markers;
  }

}
