import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';



import { FlightBookingActionTypes, FlightsLoadedAction, FlightsLoadAction } from '../actions/flight-booking.actions';
import { FlightService } from '../../services/flight.service';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class FlightBookingEffects {

  @Effect()
  flightsLoad$ =
    this.actions$
      .pipe(
        ofType(FlightBookingActionTypes.FlightsLoadAction),
        switchMap((a: FlightsLoadAction) =>
          this.flightService.find(a.from, a.to)
        ),
        map(flights => new FlightsLoadedAction(flights))
      );

  constructor(
    private actions$: Actions,
    private flightService: FlightService) {}

}
