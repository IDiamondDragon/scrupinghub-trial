import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class ManagerGame {
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

    private _emitBomb = new BehaviorSubject<boolean>(false);
    private _currentCountdownTime = new BehaviorSubject<number>(this.startedCountdownTime);
    private _changeColorBins = new BehaviorSubject<boolean>(true);
    private _changeColorBombs = new BehaviorSubject<boolean>(true);

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

    constructor() {
      this.startGame();
    }

    process() {
      this.passedTimeGame += this.stepTimer;
      this.passedTimeEmitBomb += this.stepTimer;
      this.passedCountdownTime -= this.stepTimer;

      if (this.passedTimeGame === this.durationGame) {
        this.stopGame();
      }

      if (this.passedTimeGame % 12 === 0) {
        this.emitBombEvery -= this.stepTimer;
      }

      if (this.passedTimeEmitBomb >= this.emitBombEvery) {
        this._emitBomb.next(true);

        this.passedTimeEmitBomb = 0;
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
    }

    public updateBombsColor() {
      this._changeColorBombs.next(true);
    }
}
