import { Component } from '@angular/core';
import { MonitoringService } from '../monitoring.service';

@Component({
  selector: 'app-monitoring-table',
  templateUrl: './monitoring-table.component.html',
  styleUrls: ['./monitoring-table.component.css']
})

export class MonitoringTableComponent {
  ipData: any = []

  constructor(
    private monitoringService: MonitoringService
  ){

  }
  ngOnInit(): void {
    this.monitoringService.getMonitoringData().subscribe((data: any) => {
      this.ipData = this.monitoringService.processMonitoringData(data);
    });
  }
}
