import { createSelector } from '@ngrx/store';
import { State } from './index';

export const selectAppState = (state: State)  => state.app;

export const emitBomb = createSelector(
    selectAppState,
    app => app.emitBomb
);

export const currentCountdownTime = createSelector(
  selectAppState,
  app => app.currentCountdownTime
);

export const currentPoints = createSelector(
  selectAppState,
  app => app.currentPoints
);

export const stoppedGame = createSelector(
  selectAppState,
  app => app.stoppedGame
);
