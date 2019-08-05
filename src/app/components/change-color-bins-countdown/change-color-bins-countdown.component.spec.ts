import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeColorBinsCountdownComponent } from './change-color-bins-countdown.component';

describe('ChangeColorBinsCountdownComponent', () => {
  let component: ChangeColorBinsCountdownComponent;
  let fixture: ComponentFixture<ChangeColorBinsCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeColorBinsCountdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeColorBinsCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
