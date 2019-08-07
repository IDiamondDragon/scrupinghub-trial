import { Component, OnInit, HostBinding, Input, ChangeDetectorRef, Renderer2, OnDestroy } from '@angular/core';
import { PositionService } from '../../../core/services/position.service';
import { ColorGeneratorService } from '../../../core/services/color-generator.service';
import { BombSettings } from '../../../models/classes/bomb-settings';
import { ManagerGame } from 'src/app/core/services/manager-game.service';
import { Subscription } from 'rxjs';
import { RandomValueGeneratorService } from '../../../core/services/random-value-generator.service';
import { Store, select } from '@ngrx/store';
import { State } from '../../../reducers/index';

@Component({
  selector: 'app-bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.scss']
})
export class BombComponent implements OnInit, OnDestroy  {

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
              private cdr: ChangeDetectorRef,
              private renderer: Renderer2,
              private store: Store<State>) {
    this.time = randomValueGeneratorService.getRandomValue(5, 11);
  }

  ngOnInit() {
    this.subscriptions.push(

      this.managerGame.changeColorBombs.subscribe(value => {
        this.bombSettings.color = this.colorGeneratorService.getRandomColorFrom(this.colorGeneratorService.colorBins);
        console.log("Bomb settings :" + this.bombSettings.color);
        this.cdr.detectChanges();
      })

    )

    this.idInterval = setInterval(this.timer.bind(this), 1000);
  }

  private timer() {
    this.time -= 1;

    const elementsBomb = document.querySelectorAll('.' + this.bombSettings.id);
    const elementsTimesBomb = document.querySelectorAll('.' + this.bombSettings.id + ' .time');
    const previewTimeBomb =   elementsTimesBomb.item(2);
    const previewBomb =   elementsBomb.item(2);

    if (previewTimeBomb) {
      this.renderer.setProperty(previewTimeBomb, 'innerText', this.time + ' sec');
    }

    if (this.time === 0) {
      this.managerGame.removeBomb(this.bombSettings, false);

      clearInterval(this.idInterval);
      this.hide = true;

      if (previewBomb) {
        this.renderer.setStyle(previewBomb, 'display', 'none');
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
    this.subscriptions = [];
  }
}
