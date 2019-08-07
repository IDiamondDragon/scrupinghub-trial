import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BombsAreaComponent } from './components/bombs-area/bombs-area.component';
import { BombComponent } from './components/bombs-area/bomb/bomb.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangeColorBinsCountdownComponent } from './components/change-color-bins-countdown/change-color-bins-countdown.component';
import { BinsAreaComponent } from './components/bins-area/bins-area.component';
import { BinComponent } from './components/bins-area/bin/bin.component';
import { PointsCounterComponent } from './components/points-counter/points-counter.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    BombsAreaComponent,
    BombComponent,
    ChangeColorBinsCountdownComponent,
    BinsAreaComponent,
    BinComponent,
    PointsCounterComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    DragDropModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
