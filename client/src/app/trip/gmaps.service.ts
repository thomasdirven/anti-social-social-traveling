import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GmapsService {

  constructor(private http: HttpClient) { }

  getLocation(){
    
  }
}
