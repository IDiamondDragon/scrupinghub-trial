import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BombsAreaComponent } from './bombs-area.component';

describe('BombsAreaComponent', () => {
  let component: BombsAreaComponent;
  let fixture: ComponentFixture<BombsAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BombsAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BombsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
