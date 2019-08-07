import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BombSettings } from '../../models/classes/bomb-settings';
import { EmitBombAction, StoppedGameAction } from 'src/app/reducers/app.actions';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/index';
import { CurrentCountdownTimeAction, CurrentPointsAction } from '../../reducers/app.actions';
import { BombSettingsCreatorService } from './bomb-settings-creator.service';
import { ColorGeneratorService } from './color-generator.service';


@Injectable()
export class ManagerGame {
    points: number = 0;
    bombsInBins: BombSettings[] = [];

    timerId;
    stepTimerInMSec: number = 500; // in msec
    stepTimer: number = this.stepTimerInMSec / 1000;
    durationGame: number = 120; // in sec
    emitBombEvery: number = 5; // in sec
    passedTimeGame: number = 0;
    passedTimeEmitBomb: number = 0;
    startedCountdownTime: number = 40; // in sec
    passedCountdownTime: number = this.startedCountdownTime;
    idBins: string[] = ['bin1', 'bin2', 'bin3'];
    countEmitedBombs = 0;
    countEmitedBombsFinishGame = 120;

    private _changeColorBins = new BehaviorSubject<boolean>(true);
    private _changeColorBombs = new BehaviorSubject<boolean>(true);
    private _settedBaseSizeBins = new BehaviorSubject<boolean>(false);

    public get changeColorBins(): Observable<boolean> {
      return this._changeColorBins;
    }

    public get changeColorBombs(): Observable<boolean> {
      return this._changeColorBombs;
    }

    public get settedBaseSizeBins(): Observable<boolean> {
      return this._settedBaseSizeBins;
    }

    constructor(private store: Store<State>,
                private bombSettingsCreatorService: BombSettingsCreatorService,
                private colorGeneratorService: ColorGeneratorService) {
      this.startGame();
    }

    process() {
      this.passedTimeGame += this.stepTimer;
      this.passedTimeEmitBomb += this.stepTimer;
      this.passedCountdownTime -= this.stepTimer;

      if (this.countEmitedBombs === this.countEmitedBombsFinishGame) {
        this.stopGame();
        return;
      }

      if (this.passedTimeGame % 12 === 0 && this.emitBombEvery !== this.stepTimer) {
        this.emitBombEvery -= this.stepTimer;
      }

      if (this.passedTimeEmitBomb >= this.emitBombEvery && this.countEmitedBombs < this.countEmitedBombsFinishGame) {

        this.store.dispatch(new EmitBombAction(this.bombSettingsCreatorService.create()));

        this.passedTimeEmitBomb = 0;
        this.countEmitedBombs += 1;
      }

      if (this.passedCountdownTime % 1 === 0) {
        this.store.dispatch(new CurrentCountdownTimeAction(this.passedCountdownTime));
      }

      if (this.passedCountdownTime === 0) {
        this.passedCountdownTime = this.startedCountdownTime;
        this.colorGeneratorService.colorBins = [];

        this._changeColorBins.next(true);
      }
    }

    startGame() {
      this.timerId = setInterval(this.process.bind(this), this.stepTimerInMSec);
    }

    stopGame() {
       clearInterval(this.timerId);
       this.store.dispatch(new CurrentCountdownTimeAction(0));
       this.store.dispatch(new StoppedGameAction(true));
    }

    updateBombsColor() {
      this._changeColorBombs.next(true);
    }

    setBaseSizeBins() {
      this._settedBaseSizeBins.next(true);
    }

    removeBomb(bomb: BombSettings, layIntoRightBin?: boolean) {
      if (layIntoRightBin) {
        this.points += 1;
      }

      const isBombInBins = this.bombsInBins.includes(bomb);

      if (!isBombInBins) {
        this.points -= 1;
      }

      this.store.dispatch(new CurrentPointsAction(this.points));
    }
}
