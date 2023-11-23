import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddConfigurationComponent } from '../add-configuration/add-configuration.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit{
  constructor(
    private dialog: MatDialog){

  }
  ngOnInit(): void {

  }

  openAddConfigurationDialog(): void{
    this.dialog.open(AddConfigurationComponent, {
      height: '500px',
      width: '1000px',
    });
  }

}
