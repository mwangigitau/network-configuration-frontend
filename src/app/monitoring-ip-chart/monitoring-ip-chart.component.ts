import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { of, catchError } from "rxjs";
import { WebsocketService } from "../websocket.service";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexMarkers,
  ApexXAxis,
  ApexPlotOptions,
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
  selector: 'app-monitoring-ip-chart',
  templateUrl: './monitoring-ip-chart.component.html',
  styleUrls: ['./monitoring-ip-chart.component.css']
})
export class MonitoringIpChartComponent {
  public chartOptions: ChartOptions;
  selectedOption: string = "";
  uniqueIpList: string[] = [];
  dateLists: Date[][] = [];
  statusLists: number[][] = [];

  constructor(private http: HttpClient, private websocketService: WebsocketService) {
    
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      stroke: {
        width: 2, // Adjust the width
        curve: "smooth", // Use "smooth" for curved lines
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      fill: {
        opacity: 1, // Set to the desired opacity
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [100],
        },
      },
      labels:
        [],
      markers: {
        size: 5,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Status",
        },
        min: -0.2,
        max: 1.2,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;
          },
        },
      },
    };
  }

  ngOnInit(): void {
    this.getAllMonitoringData();
    // console.log("Unique IPs are", this.uniqueIpList)
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
    // console.log(selectedOption)
  }

  getAllMonitoringData(): void {
    const url = 'http://0.0.0.0:8080/monitoring/all/';
    const requestData = { database: "test", collection: "monitoring" };

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
            var index = this.uniqueIpList.indexOf(ip);
            if (index === -1) {
              this.uniqueIpList.push(ip);
              this.dateLists.push([]);
              this.statusLists.push([]);
              // Update the index to match the newly added IP address
              index = this.uniqueIpList.length - 1;
            }
        
            // Initialize the sublist if it's not already defined
            if (!this.dateLists[index]) {
              this.dateLists[index] = [];
            }
            if (!this.statusLists[index]) {
              this.statusLists[index] = [];
            }
        
            // Add date and status to the respective lists
            this.dateLists[index].push(date);
            this.statusLists[index].push(status);
          }
        }
        
        var qwerty: any[] = [];
        for (const val of this.uniqueIpList) {
          var x: any = {};
          x["name"] = val;
          x["type"] = "line";
          x["data"] = this.statusLists[this.uniqueIpList.indexOf(val)];
          qwerty.push(x);
        }

        let maxDateList: string[] | any = [];
        for (const dateList of this.dateLists) {
          if (dateList.length > maxDateList.length) {
            maxDateList = dateList;
          }
        }

        this.chartOptions.labels = maxDateList;


        const opacity_list = new Array(this.uniqueIpList.length).fill(1);
        const width_list = new Array(this.uniqueIpList.length).fill(2);
        const stops_list = new Array(this.uniqueIpList.length).fill(100);
        this.chartOptions.fill.opacity = opacity_list
        this.chartOptions.stroke.width = width_list
        this.chartOptions.fill.gradient!.stops = stops_list
        this.chartOptions.series = qwerty

      }
    );
  }
}
