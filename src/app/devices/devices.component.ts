import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Device } from '../device';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})


export class DevicesComponent implements OnInit{
devicesList: Device[] = []
constructor(
  private router: Router,
  private http: HttpClient){

}
ngOnInit(): void {
  this.getAllDevicesData()
}
openPage(url: any, dest: any): void{
  this.router.navigate([url+dest])
}

getAllDevicesData(): void{

  const url = 'http://0.0.0.0:8080/devices/all/'
  const requestData = { database: "test", collection: "devices" }; // Your request data
  this.http.post<Device[]>(url, requestData).pipe(
    catchError((error) => {
      console.error('Error fetching configuration objects:', error);
      return of([]);
    })
  ).subscribe(
    (response: any) => {
      response = response["data"]
      this.devicesList = response
    }
  );
}

}
