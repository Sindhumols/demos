import am4themes_dataviz from '@amcharts/amcharts4/themes/dataviz';
import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { RepotersService } from '../services/repoters.service';

interface Food{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-linegraph',
  templateUrl: './linegraph.component.html',
  styleUrls: ['./linegraph.component.scss']
})
export class LinegraphComponent implements OnInit {
  foods: Food[] = [
    {value: '10', viewValue: 'Top-10'},
    {value: '20', viewValue: 'Top-20'},
    {value: '30', viewValue: 'Top-30'},
    {value: '40', viewValue: 'Top-40'},
    {value: '50', viewValue: 'Top-50'}
  ];
  selectedValue: string;
 
  private chart: am4charts.XYChart;
  data: any;
  response: any = [];
  result:any=[];
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private service: RepotersService) { }


  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  onDateClick(event){
    console.log('value is',event.value);
    this.getAllReports(event.value);

    // console.log('top', event.value);
    // this.data.filter(element => {
    //   if (element["top"] == event.value) {
    //     this.chart.data = [
    //       { "sect": "confirmed", "size": element["confirmed"]},
    //       {"sect": "dead", "size": element["dead"]},
    //       {"sect": "recovered", "size": element["recovered"]}
    //     ]; 
    //   }});
  }
  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_dataviz);
    
      let chart = am4core.create("chartdiv", am4charts.XYChart);

     
      
      /* Create axes */
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "location";
      
      /* Create value axis */
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      
      /* Create series */
      var series1 = chart.series.push(new am4charts.LineSeries());
      series1.dataFields.valueY = "dead";
      series1.dataFields.categoryX = "location";
      series1.name = "dead";
      series1.tooltipText = "{name}: [bold]{valueY}[/]";
      series1.stacked = true;
      series1.strokeWidth = 4;
      series1.tensionX = 0.2;
      series1.bullets.push(new am4charts.CircleBullet());
      
      var series2 = chart.series.push(new am4charts.LineSeries());
      series2.dataFields.valueY = "recovered";
      series2.dataFields.categoryX = "location";
      series2.name = "recovered";
     
      series2.tooltipText = "{name}: [bold]{valueY}[/]";
      series2.stacked = true;
      series2.strokeWidth = 4;
      series2.tensionX = 0.2;
      series2.bullets.push(new am4charts.CircleBullet());
      
      var series3 = chart.series.push(new am4charts.LineSeries());
      series3.dataFields.valueY = "confirmed";
      series3.dataFields.categoryX = "location";
      series3.name = "confirmed";
      series3.tooltipText = "{name}: [bold]{valueY}[/]";
      series3.stacked = true;
      series3.strokeWidth =4;
      series3.tensionX = 0.2;
      series3.bullets.push(new am4charts.CircleBullet());
    


      /* Add legend */
      chart.legend = new am4charts.Legend();
      
      /* Create a cursor */
      chart.cursor = new am4charts.XYCursor();


      chart.paddingRight = 20;

      this.chart = chart;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  ngOnInit(): void {
    this.getAllReports(10);
   }
   public getAllReports(value) {
    
     this.service.covid19Countryreport().
       subscribe((response) => {
         console.log('response3', response);
 
        this.chart.data = response["data"].sort((a, b) => b.recovered - a.recovered).splice(1 ,value);
         console.log('data of country bar', this.result);
         }
         );
 
        for (let i = 0; i < 10; i++) {
          console.log('forloop');
           // this.chart.data.push(this.result[i]);
        }
         console.log('data ', this.chart.data);
 
 }}
 