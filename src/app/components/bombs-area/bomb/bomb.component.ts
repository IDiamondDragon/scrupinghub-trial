import { Component, OnInit, HostBinding, Input, ChangeDetectorRef } from '@angular/core';
import { PositionService } from '../../../core/services/position.service';
import { ColorGeneratorService } from '../../../core/services/color-generator.service';
import { BombSettings } from '../../../models/classes/bomb-settings';
import { ManagerGame } from 'src/app/core/services/manager-game.service';
import { Subscription } from 'rxjs';
import { RandomValueGeneratorService } from '../../../core/services/random-value-generator.service';

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

  private subscriptions: Subscription[] = [];
  private idInterval = null;
  color: string;
  time: number;
  hide: boolean = false;


  constructor(private positionService: PositionService,
              private colorGeneratorService: ColorGeneratorService,
              private managerGame: ManagerGame,
              randomValueGeneratorService: RandomValueGeneratorService,
              private cdr: ChangeDetectorRef) {
    this.time = randomValueGeneratorService.getRandomValue(5, 11);
  }

  ngOnInit() {
    this.subscriptions.push(

      this.managerGame.changeColorBombs.subscribe(value => {
        this.bombSettings.color = this.colorGeneratorService.getRandomColorFrom(this.managerGame.colorBins);
        this.cdr.detectChanges();
      })

    )

    this.idInterval = setInterval(this.timer.bind(this), 1000);
  }

  private timer() {
    this.time -= 1;

    if (this.time === 0) {
      this.managerGame.removeBomb(this.bombSettings, false);

      clearInterval(this.idInterval);
      this.hide = true;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
    this.subscriptions = [];
  }
}
