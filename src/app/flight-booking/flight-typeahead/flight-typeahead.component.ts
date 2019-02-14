import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Subscription, Observable, Subject } from 'rxjs';
import { tap, share, take, takeUntil, debounceTime, filter, switchMap, delay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Flight } from '../../entities/flight';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.scss']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
  timerObservable$: Observable<number>;
  timerSubscription: Subscription;
  destroy$ = new Subject<boolean>();

  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.rxjsDemo();
    this.initTypeahead();
  }

  rxjsDemo(): void {
    this.timerObservable$ =
      timer(0, 1000)
        .pipe(
          takeUntil(this.destroy$),
          tap(value => console.log('Observable TAP Operator', value)),
          take(5),
          share()
        );

    /* this.timerSubscription =
      this.timerObservable$
        .subscribe(value => console.log('TS subscribe', value)); */
  }

  initTypeahead(): void {

    this.flights$ =
      this.control.valueChanges
        .pipe(
          debounceTime(300),
          filter(city => city.length > 2),
          tap(() => this.loading = true),
          // delay(3000),
          switchMap(city => this.load(city)),
          tap(() => this.loading = false),
        );

  }

  load(from: string): Observable<Flight[]>  {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
                        .set('from', from);

    const headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }

  ngOnDestroy(): void {
    // this.timerSubscription.unsubscribe();
    this.destroy$.next(true);
  }
}
