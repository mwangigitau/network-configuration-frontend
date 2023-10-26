import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(private http: HttpClient){}

  icon = {
    icon: L.icon({
      iconSize: [ 40, 40 ],
      iconUrl: '../assets/blue-pin.png',
    })
  };
  private markersLayer: L.LayerGroup = L.layerGroup();

  ngOnInit() {
    const map = L.map('map', {
      preferCanvas: true,
    });
    map.setView([0.59342599617884, 37.781879702718925], 6.49);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

    // Add markers to markersLayer

    const url = 'http://0.0.0.0:8080/devices/all/';
    const requestData = { database: "test", collection: "students" }; // Your request data

    this.http.post<any[]>(url, requestData).pipe(
      catchError((error) => {
        console.error('Error fetching monitoring objects:', error);
        return of([]);
      })
    ).subscribe(
      (response) => {
        // console.log(response);
          for (let a = 0; a < response.length; a++) {
            var coordinates = response[a]['project_coordinates']['coordinates']
            var marker = L.marker([parseFloat(coordinates[0]), parseFloat(coordinates[1])], this.icon);
            marker.bindPopup(`
            <div class="h4 font-weight-bold mb-2">${response[a].project_name}</div>
            <div class="text-center">${response[a].status}</div>`
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
