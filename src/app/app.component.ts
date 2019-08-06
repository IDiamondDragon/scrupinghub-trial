import { Component } from '@angular/core';
import { ManagerGame } from './core/services/manager-game.service';
import { delay } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scrupinghub-trial';
  stoppedGame: boolean;

  constructor(protected managerGame: ManagerGame) {
    let sec10 = 10000;
    this.managerGame.stoppedGame.pipe(delay(sec10)).subscribe(value => {
      this.stoppedGame = value;
    })
  }
}
