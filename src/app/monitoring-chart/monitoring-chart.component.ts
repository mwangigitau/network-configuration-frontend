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
import { WebsocketService } from "../websocket.service";

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

const uniqueIpList: any = [];
const dateLists: any = [];
const statusLists: any = [];

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
    private websocketService: WebsocketService
  ) {
    this.websocketService.ws.addEventListener("open", (event: Event) => {
      // this.getAllMonitoringData()
    });    
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      stroke: {
        width: [],
        curve: "straight"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%"
        }
      },

      fill: {
        opacity: [],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: []
        }
      },
      labels: [],
      markers: {
        size: 5
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        title: {
          text: "Status"
        },
        min: -1.2,
        max: 1.2,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
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

  getAllMonitoringData(): void {
    const url = 'http://0.0.0.0:8080/monitoring/all/';
    const requestData = { database: "test", collection: "students" };

    this.http.post<any[]>(url, requestData).pipe(
      catchError((error) => {
        console.error('Error fetching monitoring objects:', error);
        return of([]);
      })
    ).subscribe(
      (response) => {
        
        const values = Object.values(response);
        
        for (const items of values) {
          for (const item of items) {
            const ip = item["ip address"];
            const date = item.date;
            const status = item.status;
        
            // Check if the IP address is not in the uniqueIpList; if not, add it and initialize lists
            var index = uniqueIpList.indexOf(ip);
            if (index === -1) {
              uniqueIpList.push(ip);
              dateLists.push([]);
              statusLists.push([]);
              // Update the index to match the newly added IP address
              index = uniqueIpList.length - 1;
            }
        
            // Initialize the sublist if it's not already defined
            if (!dateLists[index]) {
              dateLists[index] = [];
            }
            if (!statusLists[index]) {
              statusLists[index] = [];
            }
        
            // Add date and status to the respective lists
            dateLists[index].push(date);
            statusLists[index].push(status);
          }
        }
        console.log(dateLists)
        console.log(statusLists)
        var qwerty: any = []
        
        for(const val in uniqueIpList){
          var x: any = {}
          x["name"] = uniqueIpList[val]
          x["type"] = "line"
          x["data"] = statusLists[val]
          qwerty.push(x)
        }

        for (const val of uniqueIpList) {
          const index = uniqueIpList.indexOf(val)
          this.chartOptions.labels = dateLists[index];
        }

        const opacity_list = new Array(uniqueIpList.length).fill(1);
        const width_list = new Array(uniqueIpList.length).fill(2);
        const stops_list = new Array(uniqueIpList.length).fill(100);
        this.chartOptions.fill.opacity = opacity_list
        this.chartOptions.stroke.width = width_list
        this.chartOptions.fill.gradient!.stops = stops_list
        this.chartOptions.series = qwerty

      }
    );
  }

  getAllConfigurationData(): void{

    const url = 'http://0.0.0.0:8080/configuration/all/'
    const requestData = { database: "test", collection: "students" }; // Your request data
    this.http.post<any[]>(url, requestData).pipe(
      catchError((error) => {
        console.error('Error fetching configuration objects:', error);
        return of([]);
      })
    ).subscribe(
      (response) => {
        // console.log(response);
        // this.chartOptions.series[1].data = response
      }
    );
  }
}
