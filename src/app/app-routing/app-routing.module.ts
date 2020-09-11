import { Covid19barComponent } from './../covid19bar/covid19bar.component';

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from '../charts/charts.component';
import { CountrybarreportComponent } from '../countrybarreport/countrybarreport.component';
import { CountrypiereportComponent } from '../countrypiereport/countrypiereport.component';
import { Covid19Component } from '../covid19/covid19.component';
import { FormtaskComponent } from '../formtask/formtask.component';
import { LinegraphComponent } from '../linegraph/linegraph.component';
import { ProfileComponent } from '../profile/profile.component';


const routes: Routes = [
  {path:'charts',component:ChartsComponent},
  {path:'countrybarreport',component:CountrybarreportComponent},
  {path:'countrypiereport',component: CountrypiereportComponent},
  {path:'covid19',component:Covid19Component},
  {path:'covid19bar',component:Covid19barComponent},
  {path:'formtask',component:FormtaskComponent},
  {path:'linegraph',component: LinegraphComponent},
  {path:'profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingComponents=[
//   ChartsComponent,
//   CountrybarreportComponent,
//   CountrypiereportComponent,
//   Covid19Component,
//   Covid19barComponent,
//   FormtaskComponent,
//   LinegraphComponent,
//   ProfileComponent
