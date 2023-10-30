import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringTableComponent } from './monitoring-table.component';

describe('MonitoringTableComponent', () => {
  let component: MonitoringTableComponent;
  let fixture: ComponentFixture<MonitoringTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitoringTableComponent]
    });
    fixture = TestBed.createComponent(MonitoringTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
