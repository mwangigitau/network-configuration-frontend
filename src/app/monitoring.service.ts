import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class MonitoringService {
  constructor(private http: HttpClient, private webSocketService: WebsocketService) {
    this.webSocketService.getWebSocket().subscribe(
      (message: any) => {
        this.getMonitoringData();
      },
      (error: any) => {
        console.error('WebSocket error:', error);
      }
    );
  }

  // Fetch monitoring data from your FastAPI backend
  getMonitoringData(): Observable<any> {
    const url = 'http://0.0.0.0:8080/monitoring/all/';
    const requestData = { database: 'test', collection: 'monitoring' };
    return this.http.post(url, requestData);
  }

  // Process monitoring data and calculate uptime and downtime
  processMonitoringData(data: any): Map<string, { uptime: number; downtime: number }> {
    const ipData = new Map<string, { uptime: number; downtime: number }>();

    // Ensure 'data' is an array
    data = data["data"];
    
    // Process data and calculate uptime/downtime for each IP address
    data.forEach((item: any) => {
      const ip = item['ip address'];
      const status = item.status;

      if (!ipData.has(ip)) {
        ipData.set(ip, { uptime: 0, downtime: 0 });
      }

      const ipStatus: any = ipData.get(ip);

      if (status === 1) {
        ipStatus.uptime += 1;
      } else {
        ipStatus.downtime += 1;
      }

      ipData.set(ip, ipStatus);
    });

    return ipData;
  }
}
