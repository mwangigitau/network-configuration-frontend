import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { of, catchError } from "rxjs";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexMarkers,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-monitoring-chart',
  templateUrl: './monitoring-chart.component.html',
  styleUrls: ['./monitoring-chart.component.css']
})
export class MonitoringChartComponent implements OnInit{
  public chartOptions: ChartOptions;
  selectedOption: string = ''

  constructor(
    private http: HttpClient,
  ) {

    this.chartOptions = {
      series: [
        {
          name: "Clients",
          type: "column",
          data: []
        },
        {
          name: "Projects",
          type: "bar",
          data: []
        },
        {
          name: "Distance",
          type: "line",
          data: []
        },
        {
          name: "Money",
          type: "line",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      stroke: {
        width: [5, 5, 5, 5],
        curve: "smooth"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%"
        }
      },

      fill: {
        opacity: [1, 1, 1, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: [
        "01/01/2003",
        "02/01/2003",
        "03/01/2003",
        "04/01/2003",
        "05/01/2003",
        "06/01/2003",
        "07/01/2003",
        "08/01/2003",
        "09/01/2003",
        "10/01/2003",
        "11/01/2003"
      ],
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        title: {
          text: "Number"
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " items";
            }
            return y;
          }
        }
      }
    };
  }
  ngOnInit(): void {
    this.getAllConfigurationData()
    this.getAllMonitoringData()
  }
  
  public generateData(count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }

  onOptionChange(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    this.selectedOption = selectedOption;
    console.log(selectedOption)
  }

  getAllMonitoringData(): void{

    const url = 'http://0.0.0.0:8080/monitoring/all/'
    this.http.get<any[]>(url, {headers:{"database": "test", "collection": "students"}}).pipe(
      catchError((error) => {
        console.error('Error fetching monitoring objects:', error);
        return of([]);
      })
    ).subscribe(
      (response) => {
        console.log(response)
        this.chartOptions.series[0].data = response
      }
    );
  }

  getAllConfigurationData(): void{

    const url = 'http://0.0.0.0:8080/configuration/all/'
    this.http.get<any[]>(url, {}).pipe(
      catchError((error) => {
        console.error('Error fetching configuration objects:', error);
        return of([]);
      })
    ).subscribe(
      (response) => {
        this.chartOptions.series[1].data = response
      }
    );
  }
}
