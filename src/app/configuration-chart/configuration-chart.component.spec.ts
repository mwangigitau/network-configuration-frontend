import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationChartComponent } from './configuration-chart.component';

describe('ConfigurationChartComponent', () => {
  let component: ConfigurationChartComponent;
  let fixture: ComponentFixture<ConfigurationChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigurationChartComponent]
    });
    fixture = TestBed.createComponent(ConfigurationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
