import { Component,OnInit , Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { RepotersService } from '../services/repoters.service';

interface location{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-covid19bar',
  templateUrl: './covid19bar.component.html',
  styleUrls: ['./covid19bar.component.scss']
})


export class Covid19barComponent implements OnInit {
  private chart: am4charts.XYChart;
  data: any;
  response: any = [];
  selectedValue: string;
  country: location[] = [];
  foods: location[] = [
    {value: '10', viewValue: 'Top-10'},
    {value: '20', viewValue: 'Top-20'},
    {value: '30', viewValue: 'Top-30'},
    {value: '40', viewValue: 'Top-40'},
    {value: '50', viewValue: 'Top-50'}
  ];

  constructor(@Inject(PLATFORM_ID) private platformId,
  private zone: NgZone,
  private service: RepotersService) { }

  onDateClick(event) {
    console.log('value is',event.value);
    this.getAllReports(event.value);
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
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create('chartdiv', am4charts.XYChart)
      chart.colors.step = 2;

  chart.legend = new am4charts.Legend()
  chart.legend.position = 'top';
  chart.legend.paddingBottom = 20;
  chart.legend.labels.template.maxWidth = 190;
 
  let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
  xAxis.dataFields.category = 'location';
  xAxis.renderer.cellStartLocation = 0.1;
  xAxis.renderer.cellEndLocation = 0.9;
  xAxis.renderer.grid.template.location = 0;
 
  let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
  yAxis.min = 0;
  
  function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = value;
      series.dataFields.categoryX = 'location';
      // series.tooltipText = "{name}: [bold]{value}[/]";
      series.tooltipText="{value}:[bold]{name}[/]"
      // series.stacked = true;
      series.name = name;
      series.strokeWidth =4;
      // series.tension = 0.2;
  
      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);
  
      let bullet = series.bullets.push(new am4charts.LabelBullet())
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = '{valueY}'
      bullet.label.fill = am4core.color('#ffffff')
  
      return series;
  }
  
  
  
  createSeries('dead', 'The dead');
  createSeries('confirmed', 'The confirmed');
  createSeries('recovered', 'The recovered');
  
  function arrangeColumns() {
  
      let series = chart.series.getIndex(0);
  
      let w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
          let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
          let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
          let delta = ((x1 - x0) / chart.series.length) * w;
          if (am4core.isNumber(delta)) {
              let middle = chart.series.length / 2;
  
              let newIndex = 0;
              chart.series.each(function(series) {
                  if (!series.isHidden && !series.isHiding) {
                      series.dummyData = newIndex;
                      newIndex++;
                  }
                  else {
                      series.dummyData = chart.series.indexOf(series);
                  }
              })
              let visibleCount = newIndex;
              let newMiddle = visibleCount / 2;
  
              chart.series.each(function(series) {
                  let trueIndex = chart.series.indexOf(series);
                  let newIndex = series.dummyData;
  
                  let dx = (newIndex - trueIndex + middle - newMiddle) * delta
  
                  series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                  series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
              })
          }
      }
  }



this.chart=chart;   
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
        console.log('data of country bar', this.data);
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

       
        }
        );
}}