import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManagerGame } from '../../core/services/manager-game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-color-bins-countdown',
  templateUrl: './change-color-bins-countdown.component.html',
  styleUrls: ['./change-color-bins-countdown.component.scss']
})
export class ChangeColorBinsCountdownComponent {
  constructor(private managerGame: ManagerGame) { }
}

