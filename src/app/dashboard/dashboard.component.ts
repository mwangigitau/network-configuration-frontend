import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(private router: Router,
    ){

  }
  ngOnInit(): void {
  }
  openPage(dest: any): void{
    this.router.navigate([dest])
  }

}
