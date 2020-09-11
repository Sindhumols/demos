import am4themes_dataviz from '@amcharts/amcharts4/themes/dataviz';
import { Countryreport } from './../../countryreport';
import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { RepotersService } from '../services/repoters.service';


//drop-down-value assign---
interface day {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})

export class ChartsComponent implements OnInit {
  control = new FormControl();
  selectedValue: string;
  days: day[] = [];
  private chart: am4charts.PieChart;
  response: any = [];
  data: any;
  profileForm = this.fb.group({
    day: ['']});
    filtereddays: Observable<day[]>;



 constructor(@Inject(PLATFORM_ID) private platformId,

  private zone: NgZone,
  private fb: FormBuilder,
  private service: RepotersService) {

  }
 
onDateClick(event) {
    console.log('date ', event.value);
    this.data.filter(element => {
      if (element["day"] == event.value) {
        this.chart.data = [
          {
            "sector": "totalSamplesTested", "a": element["totalSamplesTested"],
          },
          {
            "sector": "totalIndividualsTested", "a": element["totalIndividualsTested"],
          },
          {
            "sector": "totalPositiveCases", "a": element["totalPositiveCases"]
          }
        ];
      }
    });
  }
browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_dataviz);
      // am4core.useTheme(am4themes_animated);
      let chart = am4core.create("chartdiv", am4charts.PieChart);
      chart.paddingRight = 20;

     

      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "a";
      pieSeries.dataFields.category = "sector";

      // pieSeries.dataFields.value = "totalSamplesTested";
      // pieSeries.dataFields.value = "totalIndividualsTested";
      // pieSeries.dataFields.value = "totalPositiveCases";
      // source;
      pieSeries.slices.template.stroke = am4core.color("#4a2abb");
      // pieSeries.slices.template.strokeWidth = 2;
      // pieSeries.slices.template.strokeOpacity = 1;

      this.chart = chart;
      chart.innerRadius = am4core.percent(40);
    });
  }

ngOnInit(): void {
    this.getAllReports();

    // this.filtereddays = this.control.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );

  }

  // private _filter(value: string): string[] 
  //   // const filterValue = this._normalizeValue(value);
  //   return this.days.filter(day => this._normalizeValue(day).includes(filterValue));
  // }

  // private _normalizeValue(value: day): day {
  //   return value.toLowerCase().replace(/\s/g, '');
  // }

  
  public getAllReports() {
    this.service.covid19Reports().
      subscribe((response) => {
        console.log('response', response);

        this.data = response["data"];
        console.log('data', this.data);

        // adding the dates
        this.data.forEach(element => {
          this.days.push(
            { value: element["day"], viewValue: element["day"] }
          );
        });

        this.chart.data = [
          {
            "sector": "totalSamplesTested", "a": this.data[0]["totalSamplesTested"],
          },
          {
            "sector": "totalIndividualsTested", "a": this.data[0]["totalIndividualsTested"],
          },
          {
            "sector": "totalPositiveCases", "a": this.data[0]["totalPositiveCases"]
          }
        ]

      });
  }
}
