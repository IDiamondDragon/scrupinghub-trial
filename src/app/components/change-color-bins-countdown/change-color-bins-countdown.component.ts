import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManagerGame } from '../../core/services/manager-game.service';
import { Subscription, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../../reducers/index';
import { currentCountdownTime } from '../../reducers/app.selectors';

@Component({
  selector: 'app-change-color-bins-countdown',
  templateUrl: './change-color-bins-countdown.component.html',
  styleUrls: ['./change-color-bins-countdown.component.scss']
})
export class ChangeColorBinsCountdownComponent {
  currentCountdownTime$ = of(0);

  constructor(private managerGame: ManagerGame,
              private store: Store<State>) {
    this.currentCountdownTime$ = this.store.pipe(select(currentCountdownTime));
  }
}

