import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { PositionService } from '../../../core/services/position.service';
import { ColorGeneratorService } from '../../../core/services/color-generator.service';
import { BombSettings } from '../../../models/classes/bomb-settings';
import { ManagerGame } from 'src/app/core/services/manager-game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.scss']
})
export class BombComponent implements OnInit  {

  @HostBinding('style.grid-area')
    cell: string = this.positionService.getRandomCell();

  @Input()
    bombSettings: BombSettings;

  @Input()
    index: number;

  protected color: string;
  private subscriptions: Subscription[] = [];

  constructor(private positionService: PositionService,
              private colorGeneratorService: ColorGeneratorService,
              private managerGame: ManagerGame) {

  }

  ngOnInit() {
    this.subscriptions.push(

      this.managerGame.changeColorBombs.subscribe(value => {
        this.bombSettings.color = this.colorGeneratorService.getRandomColorFrom(this.managerGame.colorBins);
      })

    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
    this.subscriptions = [];
  }
}
