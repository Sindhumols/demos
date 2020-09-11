import  am4themes_dataviz  from '@amcharts/amcharts4/themes/dataviz';
import { Component,OnInit , Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { RepotersService } from '../services/repoters.service';

@Component({
  selector: 'app-countrybarreport',
  templateUrl: './countrybarreport.component.html',
  styleUrls: ['./countrybarreport.component.scss']
})
export class CountrybarreportComponent implements OnInit {
  private chart: am4charts.XYChart;
  result:any=[];
  response: any = [];

  constructor(@Inject(PLATFORM_ID) private platformId,
   private zone: NgZone,
   private service: RepotersService) { }


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

      let chart = am4core.create("chartdiv", am4charts.XYChart);

     
      
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "location";
      categoryAxis.title.text = "Countries";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      
      
      var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Cases";
      
      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "dead";
      series.dataFields.categoryX = "location";
      series.name = "dead";
      series.tooltipText = "{name}: [bold]{valueY}[/]";
      series.stacked = true;
      
      var series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueY = "confirmed";
      series2.dataFields.categoryX = "location";
      series2.name = "confirmed";
      series2.tooltipText = "{name}: [bold]{valueY}[/]";
      series2.stacked = true;
      
      var series3 = chart.series.push(new am4charts.ColumnSeries());
      series3.dataFields.valueY = "recovered";
      series3.dataFields.categoryX = "location";
      series3.name = "recovered";
      series3.tooltipText = "{name}: [bold]{valueY}[/]";
      series3.stacked = true;
      
      // Add cursor
      chart.cursor = new am4charts.XYCursor();
  //     chart.paddingRight = 20;
      this.chart= chart;
  //     let data = [];
  //    
    });

  

  }

  ngOnInit(): void {
   this.getAllReports();
  }
  public getAllReports() {
   
    this.service.covid19Countryreport().
      subscribe((response) => {
        console.log('response3', response);

       this.chart.data = response["data"].sort((a, b) => b.confirmed - a.confirmed).splice(1 , 10);
        console.log('data of country bar', this.result);
        }
        );

       for (let i = 0; i < 10; i++) {
         console.log('forloop');
          // this.chart.data.push(this.result[i]);
       }
        console.log('data ', this.chart.data);

}}
