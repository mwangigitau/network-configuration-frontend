import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Observable, catchError, of } from 'rxjs';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private websocketService: WebsocketService,
    ){
      this.websocketService.getWebSocket().subscribe(
        (message: any) => {
          this.getDeviceData()
        },
        (error: any) => {
          console.error('WebSocket error:', error);
        }
      );
    }

  icon = {
    icon: L.icon({
      iconSize: [ 40, 40 ],
      iconUrl: '../assets/blue-pin.svg',
    })
  };
  private markersLayer: L.LayerGroup = L.layerGroup();

  getDeviceData(): Observable<any[]> {
    const url = 'http://0.0.0.0:8080/devices/all/';
    const requestData = { database: "test", collection: "devices" };

    return this.http.post<any[]>(url, requestData).pipe(
      catchError((error) => {
        console.error('Error fetching device data:', error);
        return of([]);
      })
    );
  }

  ngOnInit() {
    const map = L.map('map', {
      preferCanvas: true,
    });

    map.setView([0.59342599617884, 37.781879702718925], 6.49);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

    // Add markers to markersLayer
    this.getDeviceData().subscribe(
      (response: any) => {
        response = response["data"]
          for (let a = 0; a < response.length; a++) {
            var coordinates = new Array(response[a]['coordinates'])
            var marker = L.marker([parseFloat(coordinates[a][0]), parseFloat(coordinates[a][1])], this.icon);
            marker.bindPopup(`
            <div class="h4 font-weight-bold mb-2">${response[a].mac_address}</div>
            <div class="text-center">${response[a].type}</div>`
            );
            marker.addTo(this.markersLayer);
          }
      }
    );
    this.markersLayer.addTo(map)

    // Add Search
    // var controlSearch = new L.Control.Search({
    //   position:'topleft',		
    //   layer: this.markersLayer,
    //   initial: false,
    //   zoom: 18,
    //   marker: false
    // });
  
    // map.addControl( controlSearch );
  }
}
