import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistAvailabilityComponent } from './specialist-availability.component';

describe('SpecialistAvailabilityComponent', () => {
  let component: SpecialistAvailabilityComponent;
  let fixture: ComponentFixture<SpecialistAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistAvailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialistAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
