import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { ReportsComponent } from './reports/reports.component';
import { MapComponent } from './map/map.component';
import { ConfigurationChartComponent } from './configuration-chart/configuration-chart.component';
import { MonitoringChartComponent } from './monitoring-chart/monitoring-chart.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    ConfigurationComponent,
    MonitoringComponent,
    LoginComponent,
    SidebarComponent,
    DevicesComponent,
    DeviceDetailsComponent,
    ReportsComponent,
    MapComponent,
    ConfigurationChartComponent,
    MonitoringChartComponent,
    NavComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SweetAlert2Module.forRoot(),
    NgApexchartsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatMenuModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }