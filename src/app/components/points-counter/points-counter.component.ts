import { Component, OnInit } from '@angular/core';
import { ManagerGame } from 'src/app/core/services/manager-game.service';

@Component({
  selector: 'app-points-counter',
  templateUrl: './points-counter.component.html',
  styleUrls: ['./points-counter.component.scss']
})
export class PointsCounterComponent implements OnInit {

  constructor(private managerGame: ManagerGame) { }

  ngOnInit() {
  }

}
