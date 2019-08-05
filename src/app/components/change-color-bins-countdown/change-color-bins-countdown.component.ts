import { Component, OnInit } from '@angular/core';
import { ManagerGame } from '../../core/services/manager-game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-color-bins-countdown',
  templateUrl: './change-color-bins-countdown.component.html',
  styleUrls: ['./change-color-bins-countdown.component.scss']
})
export class ChangeColorBinsCountdownComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  time: number = this.managerGame.startedCountdownTime;

  constructor(private managerGame: ManagerGame) { }

  ngOnInit() {
    this.subscriptions.push(

      this.managerGame.currentCountdownTime.subscribe(value => {
        this.time = value;
      })

    );
  }
}

