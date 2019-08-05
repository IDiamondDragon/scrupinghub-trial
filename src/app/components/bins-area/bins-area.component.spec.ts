import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinsAreaComponent } from './bins-area.component';

describe('BinsAreaComponent', () => {
  let component: BinsAreaComponent;
  let fixture: ComponentFixture<BinsAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinsAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
