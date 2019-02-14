import { Component, OnInit } from '@angular/core';

import { Flight } from '../../entities/flight';
import { FlightService } from '../services/flight.service';
import * as fromFlightBooking from '../+state/reducers/flight-booking.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FlightsLoadedAction, FlightUpdateAction, FlightsLoadAction } from '../+state/actions/flight-booking.actions';
import { take } from 'rxjs/operators';

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
  flights$: Observable<Flight[]>;

  myFlight: Flight;
  myFlights: Flight[];

  basket: object = {
    "3": true,
    "5": true
  };

  constructor(
    private flightService: FlightService,
    private store: Store<fromFlightBooking.FeatureState>) { }

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

    this.flights$ =
      this.store
        .pipe(
          select(state => state.flightBooking.flights)
        );
  }

  search(): void {
    /* this.flightService
      .find(this.from, this.to)
      .subscribe(
        flights => {
          this.store.dispatch(new FlightsLoadedAction(flights));
          // this.flights = flights;
          // console.log(flights);
        },
        errResp => console.error('Error loading flights', errResp)
      );   */  
    
    this.store.dispatch(new FlightsLoadAction(this.from, this.to));
  }

  delay(): void {
    this.flights$
      .pipe(
        take(1)
      )
      .subscribe(flights => {
        const flight = flights[0];

        const oldDate = new Date(flight.date);
        const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
        const newFlight = {
          ...flight,
          date: newDate.toISOString()
        };

        this.store.dispatch(new FlightUpdateAction(newFlight));
      });
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }
}
