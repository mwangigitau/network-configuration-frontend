import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent {
constructor(private router: Router){

}
openPage(dest: any): void{
  this.router.navigate([dest])
}

}
