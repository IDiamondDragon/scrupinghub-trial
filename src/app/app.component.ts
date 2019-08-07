import { Component } from '@angular/core';
import { ManagerGame } from './core/services/manager-game.service';
import { delay } from "rxjs/operators";
import { Store, select } from '@ngrx/store';
import { State } from './reducers/index';
import { stoppedGame } from './reducers/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scrupinghub-trial';
  stoppedGame: boolean;

  constructor(protected managerGame: ManagerGame,
              private store: Store<State>) {
    const sec10 = 10000;

    //this.managerGame.stoppedGame.pipe(delay(sec10)).subscribe(value => {
    this.store.pipe(select(stoppedGame)).pipe(delay(sec10)).subscribe(value => {
      this.stoppedGame = value;
    });
  }
}
