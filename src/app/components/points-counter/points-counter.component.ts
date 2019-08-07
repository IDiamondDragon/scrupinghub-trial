import { Component, OnInit } from '@angular/core';
import { ManagerGame } from 'src/app/core/services/manager-game.service';
import { Store, select } from '@ngrx/store';
import { State } from '../../reducers/index';
import { of } from 'rxjs';
import { currentPoints } from '../../reducers/app.selectors';

@Component({
  selector: 'app-points-counter',
  templateUrl: './points-counter.component.html',
  styleUrls: ['./points-counter.component.scss']
})
export class PointsCounterComponent implements OnInit {
  currentPoints$ = of(0);

  constructor(private managerGame: ManagerGame,
              private store: Store<State>) {
      this.currentPoints$ = this.store.pipe(select(currentPoints));
  }

  ngOnInit() {
  }

}
