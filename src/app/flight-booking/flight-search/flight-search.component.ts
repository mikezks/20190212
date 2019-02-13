import { Component, OnInit } from '@angular/core';

import { Flight } from '../../entities/flight';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {

  from: string = 'Graz';
  to: string = 'Hamburg';
  flights: Flight[] = [
    {
      id: 1,
      from: '',
      to: '',
      date: '',
      delayed: false
    }
  ];
  selectedFlight: Flight = {
    id: 1,
    from: '',
    to: '',
    date: '',
    delayed: false
  };

  myFlight: Flight;
  myFlights: Flight[];

  basket: object = {
    "3": true,
    "5": true
  };

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.flights = this.flightService.flights;

    this.myFlight = {
      ...this.selectedFlight,
      from: 'Madrid'
    };

    this.myFlight.id = 3;

    this.myFlights = [
      ...this.flights.slice(0, 1)
    ];
  }

  search(): void {
    this.flightService
      .find(this.from, this.to)
      .subscribe(
        flights => {
          this.flights = flights;
          console.log(flights);
        },
        errResp => console.error('Error loading flights', errResp)
      );    
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }
}
