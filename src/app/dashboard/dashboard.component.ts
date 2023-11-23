import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(private router: Router){

    }

  ngOnInit(): void {
    this.displayCurrentTime()
  }
  openPage(dest: any): void{
    this.router.navigate([dest])
  }

  displayCurrentTime() {
    const time_now = new Date().toLocaleString()
    return time_now
    }
}
