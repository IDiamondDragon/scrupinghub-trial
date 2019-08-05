import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ManagerGame } from 'src/app/core/services/manager-game.service';

@Component({
  selector: 'app-bins-area',
  templateUrl: './bins-area.component.html',
  styleUrls: ['./bins-area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BinsAreaComponent implements OnInit {

  constructor(protected managerGame: ManagerGame) { }

  ngOnInit() {
  }

}
