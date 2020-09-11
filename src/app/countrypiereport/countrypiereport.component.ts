import  am4themes_dataviz  from '@amcharts/amcharts4/themes/dataviz';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { RepotersService } from '../services/repoters.service';


import { Countryreport } from './../../countryreport';
import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

interface location{
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-countrypiereport',
  templateUrl: './countrypiereport.component.html',
  styleUrls: ['./countrypiereport.component.scss']
})


export class CountrypiereportComponent implements OnInit {
  selectedValue: string;
  country: location[] = [];
 
    private chart: am4charts.PieChart;
  response: any = [];
  data: any;
  profileForm = this.fb.group({
  location: ['']});


  constructor(@Inject(PLATFORM_ID) private platformId,
  private zone: NgZone,
  private fb: FormBuilder,
  private service: RepotersService) { }


  onDateClick(event) {
    console.log('Country', event.value);
    this.data.filter(element => {
      if (element["location"] == event.value) {
        this.chart.data = [
          { "sect": "confirmed", "size": element["confirmed"]},
          {"sect": "dead", "size": element["dead"]},
          {"sect": "recovered", "size": element["recovered"]}
        ]; 
      }});
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
      let chart1 = am4core.create("chartdiv1", am4charts.PieChart);
      // chart.paddingRight = 20;

     

      let pieSeries = chart1.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "size";
      pieSeries.dataFields.category = "sect";
      pieSeries.slices.template.stroke = am4core.color("#4a2abb");
      // pieSeries.slices.template.strokeWidth = 2;
      // pieSeries.slices.template.strokeOpacity = 1;

      this.chart= chart1;
      // chart.innerRadius = am4core.percent(40);
    });
  }


    ngOnInit(): void {
      this.getAllReports();
    }

    public getAllReports() {
      this.service.covid19Countryreport().
        subscribe((response) => {
          console.log('response2', response);
  
          this.data = response["data"];
          console.log('data of country pie', this.data);
  
          // adding the dates
          this.data.forEach(element => {
            this.country.push(
              { value: element["location"], viewValue: element["location"] }
            );
          });
        
          // this.chart.data = [
          //   {
          //     "sect": "confirmed", "size": this.data[0]["confirmed"],
          //   },
          //   {
          //     "sect": "dead", "size": this.data[0]["dead"],
          //   },
          //   {
          //     "sect": "recovered", "size": this.data[0]["recovered"]
          //   }
          // ]
  
        });
    }

}
