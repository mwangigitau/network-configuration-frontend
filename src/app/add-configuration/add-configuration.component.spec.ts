import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConfigurationComponent } from './add-configuration.component';

describe('AddConfigurationComponent', () => {
  let component: AddConfigurationComponent;
  let fixture: ComponentFixture<AddConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddConfigurationComponent]
    });
    fixture = TestBed.createComponent(AddConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
