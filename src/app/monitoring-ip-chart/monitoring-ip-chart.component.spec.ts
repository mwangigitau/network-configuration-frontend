import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringIpChartComponent } from './monitoring-ip-chart.component';

describe('MonitoringIpChartComponent', () => {
  let component: MonitoringIpChartComponent;
  let fixture: ComponentFixture<MonitoringIpChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitoringIpChartComponent]
    });
    fixture = TestBed.createComponent(MonitoringIpChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
