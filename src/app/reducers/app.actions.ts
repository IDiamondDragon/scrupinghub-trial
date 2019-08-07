import { Action } from '@ngrx/store';
import { BombSettings } from '../models/classes/bomb-settings';

export enum AppActionTypes {
  EmitBombAction = '[App] Emit Bomb Action',
  CurrentCountdownTimeAction = '[App] Current Countdown Time Action',
  CurrentPointsAction = '[App] Current Points Action',
  StoppedGameAction = '[App] Stopped Game Action'
}

export class EmitBombAction implements Action {
  readonly type = AppActionTypes.EmitBombAction;

  constructor(public payload: BombSettings ) {

  }
}

export class CurrentCountdownTimeAction implements Action {
  readonly type = AppActionTypes.CurrentCountdownTimeAction;

  constructor(public payload: number ) {

  }
}

export class CurrentPointsAction implements Action {
  readonly type = AppActionTypes.CurrentPointsAction;

  constructor(public payload: number ) {

  }
}

export class StoppedGameAction implements Action {
  readonly type = AppActionTypes.StoppedGameAction;

  constructor(public payload: boolean ) {

  }
}


export type AppActions = EmitBombAction | CurrentCountdownTimeAction |  CurrentPointsAction | StoppedGameAction;
