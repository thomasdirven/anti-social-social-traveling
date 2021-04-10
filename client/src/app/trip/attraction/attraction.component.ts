import { Component, OnInit, Input } from '@angular/core';
import { Attraction } from '../attraction.model';

@Component({
  selector: 'app-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.scss']
})
export class AttractionComponent implements OnInit {
  @Input() public attraction: Attraction;

  constructor() { }

  ngOnInit(): void {
  }

}
