import { Component, Input, NgZone, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../trip.model';
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
  @Input() public trips: Trip[];
  @Input() public hoverTrip?: Trip;

  public isCheckedMapTypeControl = false;

  constructor(private zone: NgZone) {}

  public hoverIcon = {
    url:
      'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4',
    scaledSize: {
      width: 30,
      height: 40,
    },
  };

  // google maps zoom level
  public zoom: number = 4;

  // initial center position for the map
  public lat: number = 47.673858;
  public lng: number = 2.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  // public static markers: marker[];

  ngOnInit(): void {
    // this.addDbMarkers();
    // console.log(GmapComponent.markers);
  }

  // private addDbMarkers() {
  //   console.log(this.trips);
  //   this.trips.forEach((trip) => {
  //     GmapComponent.addNewMarker(trip.latitude, trip.longtitude);
  //     console.log(trip.latitude);
  //     console.log(trip.longtitude);
  //   });

  //   console.log(GmapComponent.markers);
  // }

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

  // public ngOnDestroy(): void {
  //   if (this.mapClickListener) {
  //     this.mapClickListener.remove();
  //   }
  // }

  // public static addNewMarker(lat: number, lng: number) {
  //   this.markers = [
  //     ...this.markers,
  //     {
  //       lat: lat,
  //       lng: lng,
  //       label: 'D',
  //       draggable: false,
  //     },
  //   ];
  // }

  // get staticMarkers() {
  //   return GmapComponent.markers;
  // }

  // // variable to cache the results
  // private _fetchTrips$: Observable<Trip[]>;
  // // this is needlessly cashing, keeping state, always avoid keeping state if you can
  // public errorMessage: string = '';

  // constructor(
  //   private zone: NgZone,
  //   private _tripDataService: TripDataService
  // ) {
  // }

  // // google maps zoom level
  // zoom: number = 8;

  // // initial center position for the map
  // lat: number = 51.673858;
  // lng: number = 7.815982;

  // clickedMarker(label: string, index: number) {
  //   console.log(`clicked the marker: ${label || index}`);
  // }

  // mapClicked($event: google.maps.MouseEvent): void {
  //   GmapComponent.markers.push({
  //     lat: $event.latLng.lat(),
  //     lng: $event.latLng.lng(),
  //     draggable: true,
  //   });
  // }

  // markerDragEnd(m: marker, $event: google.maps.MouseEvent) {
  //   console.log('dragEnd', m, $event);
  // }

  // public static markers: marker[] = [
  //   {
  //     lat: 51.673858,
  //     lng: 7.815982,
  //     label: 'A',
  //     draggable: true,
  //   },
  //   {
  //     lat: 51.373858,
  //     lng: 7.215982,
  //     label: 'B',
  //     draggable: false,
  //   },
  //   {
  //     lat: 51.723858,
  //     lng: 7.895982,
  //     label: 'C',
  //     draggable: true,
  //   },
  // ];

  // get trips$(): Observable<Trip[]> {
  //   return this._fetchTrips$;
  // }

  // ngOnInit(): void {
  //   this._fetchTrips$ = this._tripDataService.allTrips$.pipe(
  //     catchError((err) => {
  //       this.errorMessage = err;
  //       console.log('hier jong');
  //       console.log(err);
  //       return EMPTY;
  //     })
  //   );
  //   this.addDbMarkers(this._tripDataService.allTrips$.pipe(
  //     catchError((err) => {
  //       this.errorMessage = err;
  //       console.log('hier jong');
  //       console.log(err);
  //       return EMPTY;
  //     })));
  //   console.log(GmapComponent.markers);
  // }

  // private addDbMarkers(trips : Observable<Trip[]>){
  //   this._fetchTrips$.forEach(trips => { trips.forEach( trip =>
  //     {GmapComponent.addNewMarker(trip.latitude, trip.longtitude);
  //     console.log((trip.latitude));
  //   console.log(trip.longtitude)})
  //   });

  //   console.log(GmapComponent.markers);
  // }

  // map: google.maps.Map;
  // mapClickListener;

  // public mapReadyHandler(map: google.maps.Map): void {
  //   this.map = map;
  //   this.mapClickListener = this.map.addListener(
  //     'click',
  //     (e: google.maps.MouseEvent) => {
  //       this.zone.run(() => {
  //         // Here we can get correct event
  //         console.log(e.latLng.lat(), e.latLng.lng());
  //       });
  //     }
  //   );
  // }

  // public ngOnDestroy(): void {
  //   if (this.mapClickListener) {
  //     this.mapClickListener.remove();
  //   }
  // }

  // public static addNewMarker(lat: number, lng: number) {
  //   this.markers = [
  //     ...this.markers,
  //     {
  //       lat: lat,
  //       lng: lng,
  //       label: 'D',
  //       draggable: false,
  //     },
  //   ];
  // }

  // get staticMarkers() {
  //   return GmapComponent.markers;
  // }
}
