import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';
import { AddConfigurationComponent } from '../add-configuration/add-configuration.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(
    private router: Router,
    private dialog: MatDialog
    )
    {

    }
  ngOnInit(): void {
  }
  openPage(dest: any): void{
    this.router.navigate([dest])
  }

  openAddConfigurationDialog(): void{
    this.router.navigate(['/app/configuration/'])
    this.dialog.open(AddConfigurationComponent, {
      height: '500px',
      width: '500px',
    });
  }

}
