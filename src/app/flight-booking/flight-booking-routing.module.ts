import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlightSearchComponent } from './flight-search/flight-search.component';

const routes: Routes = [
  {
    path: 'flight-booking',
    children: [
      {
        path: '',
        redirectTo: 'flight-search',
        pathMatch: 'full'
      },
      {
        path: 'flight-search',
        component: FlightSearchComponent
      },
      {
        path: 'flight-edit',
        component: FlightSearchComponent
      },
      {
        path: 'flight-edit/:id',
        component: FlightSearchComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightBookingRoutingModule { }
