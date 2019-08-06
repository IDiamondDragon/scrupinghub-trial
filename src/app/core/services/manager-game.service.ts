import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, Observable } from 'rxjs';
import { BombSettings } from '../../models/classes/bomb-settings';


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
    colorBins: string[] = [];
    idBins: string[] = ['bin1', 'bin2', 'bin3'];
    countEmitedBombs = 0;
    countEmitedBombsFinishGame = 120;

    private _emitBomb = new BehaviorSubject<boolean>(false);
    private _currentCountdownTime = new BehaviorSubject<number>(this.startedCountdownTime);
    private _changeColorBins = new BehaviorSubject<boolean>(true);
    private _changeColorBombs = new BehaviorSubject<boolean>(true);
    private _currentPoints = new BehaviorSubject<number>(0);
    private _stoppedGame = new BehaviorSubject<boolean>(false);
    private _settedBaseSizeBins = new BehaviorSubject<boolean>(false);

    public get emitBomb(): Observable<boolean> {
      return this._emitBomb;
    }

    public get currentCountdownTime(): Observable<number> {
      return this._currentCountdownTime;
    }

    public get changeColorBins(): Observable<boolean> {
      return this._changeColorBins;
    }

    public get changeColorBombs(): Observable<boolean> {
      return this._changeColorBombs;
    }

    public get currentPoints(): Observable<number> {
      return this._currentPoints;
    }

    public get stoppedGame(): Observable<boolean> {
      return this._stoppedGame;
    }

    public get settedBaseSizeBins(): Observable<boolean> {
      return this._settedBaseSizeBins;
    }


    constructor() {
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
        this._emitBomb.next(true);

        this.passedTimeEmitBomb = 0;
        this.countEmitedBombs += 1;
      }

      if (this.passedCountdownTime % 1 === 0) {
        this._currentCountdownTime.next(this.passedCountdownTime);
      }

      if (this.passedCountdownTime === 0) {
        this.passedCountdownTime = this.startedCountdownTime;
        this.colorBins = [];
        this._changeColorBins.next(true);
      }
    }

    startGame() {
      this.timerId = setInterval(this.process.bind(this), this.stepTimerInMSec);
    }

    stopGame() {
       clearInterval(this.timerId);
       this._currentCountdownTime.next(0);
       this._stoppedGame.next(true);
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

      this._currentPoints.next(this.points);
    }
}
