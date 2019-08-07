import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AppActions, AppActionTypes } from './app.actions';
import { BombSettings } from '../models/classes/bomb-settings';


export interface State {
  app: AppState;
}

export interface AppState {
  emitBomb: BombSettings;
  currentCountdownTime: number;
  currentPoints: number;
  stoppedGame: boolean;
}

export const initialAppState: AppState = {
  emitBomb: null,
  currentCountdownTime: 40,
  currentPoints: 0,
  stoppedGame: false
};


function appReducer(state: AppState = initialAppState, action: AppActions): AppState {
  switch (action.type) {

    case AppActionTypes.EmitBombAction:
      return {
        ...state,
        emitBomb: action.payload
      };

    case AppActionTypes.CurrentCountdownTimeAction:
      return {
        ...state,
        currentCountdownTime: action.payload
      };

    case AppActionTypes.CurrentPointsAction:
      return {
        ...state,
        currentPoints: action.payload
      };

    case AppActionTypes.StoppedGameAction:
      return {
        ...state,
        stoppedGame: action.payload
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<State> = {
  app: appReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
