import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightService } from 'src/app/flight-booking/services/flight.service';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'asyncCity'
})
export class AsyncCityPipe implements PipeTransform {

  constructor(private flightService: FlightService) {}
  transform(value: string): Observable<string> {
    return this.flightService.getAirportCode(value)
      .pipe(
        map(transformedValue => {
          if (transformedValue.length === 3) {
            return transformedValue;
          }
          return value;
        })
      );
  }

}
