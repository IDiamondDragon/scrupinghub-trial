import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class ManagerGame {
    private _emitBomb = new BehaviorSubject<boolean>(false);

    timerId;
    durationGame: number = 120; // in sec
    emitBombEvery: number = 5; // in sec
    passedTimeGame: number = 0;
    passedTimeEmitBomb: number = 0;
    stepTimer: number = 500; // in msec
    stepTimerInMSec: number = this.stepTimer / 1000;

    public get emitBomb(): Observable<boolean> {
      return this._emitBomb;
    }

    constructor() {
      this.startGame();
    }

    process() {
      this.passedTimeGame += this.stepTimerInMSec;
      this.passedTimeEmitBomb += this.stepTimerInMSec;

      if (this.passedTimeGame === this.durationGame) {
        this.stopGame();
      }

      if (this.passedTimeGame % 12 === 0) {
        this.emitBombEvery -= this.stepTimerInMSec;
      }

      if (this.passedTimeEmitBomb >= this.emitBombEvery) {
        this._emitBomb.next(true);

        this.passedTimeEmitBomb = 0;
      }

    }

    startGame() {
      this.timerId = setInterval(this.process.bind(this), this.stepTimer);
    }

    stopGame() {
       clearInterval(this.timerId);
    }
}
