import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Flight } from '../../entities/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  flights: Flight[] = [];

  constructor(private http: HttpClient) { }

  find(from: string, to: string): Observable<Flight[]> {
    const url = 'http://www.angular.at/api/flight';

    const headers = new HttpHeaders()
                          .set('Accept', 'application/json');

    const params = new HttpParams()
                          .set('from', from)
                          .set('to', to);

    return this.http
      .get<Flight[]>(url, { headers, params })
      .pipe(
        tap(flights => this.flights = flights )
      );
  }

  getAirportCode(city: string): Observable<string> {
    const url = 'http://www.angular.at/api/airport/code';

    const headers = new HttpHeaders()
                          .set('Accept', 'application/json');

    const params = new HttpParams()
                          .set('name', city);

    return this.http
      .get<string>(url, { headers, params })
      .pipe(
        tap(code => console.log(code))
      );
  }
}
