import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { ReportsComponent } from './reports/reports.component';
import { ConfigurationDetailsComponent } from './configuration-details/configuration-details.component';
import { AddConfigurationComponent } from './add-configuration/add-configuration.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'app',
    component: SidebarComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'add-configuration',component: AddConfigurationComponent},
      {path: 'configuration',component: ConfigurationComponent},
      {path: 'configuration/:id',component: ConfigurationDetailsComponent},
      {path: 'monitoring', component: MonitoringComponent},
      {path: 'devices', component: DevicesComponent},
      {path: 'device/:id', component: DeviceDetailsComponent },
      {path: 'reports', component: ReportsComponent},
    ]
  },
  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
