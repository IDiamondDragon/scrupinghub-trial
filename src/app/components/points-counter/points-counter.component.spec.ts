import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsCounterComponent } from './points-counter.component';

describe('PointsCounterComponent', () => {
  let component: PointsCounterComponent;
  let fixture: ComponentFixture<PointsCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
