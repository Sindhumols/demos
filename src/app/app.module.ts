import { AppRoutingModule } from './app-routing/app-routing.module';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Covid19Component } from './covid19/covid19.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DailogBoxComponent } from './dailog-box/dailog-box.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormtaskComponent } from './formtask/formtask.component';


import { ChartsComponent } from './charts/charts.component';
import { CountrypiereportComponent } from './countrypiereport/countrypiereport.component';
import { CountrybarreportComponent } from './countrybarreport/countrybarreport.component';
import { Covid19barComponent } from './covid19bar/covid19bar.component';
import { LinegraphComponent } from './linegraph/linegraph.component';
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    Covid19Component,
    DailogBoxComponent,
    ProfileComponent,
    FormtaskComponent,
    ChartsComponent,
    CountrypiereportComponent,
    CountrybarreportComponent,
    Covid19barComponent,
    LinegraphComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AmChartsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
