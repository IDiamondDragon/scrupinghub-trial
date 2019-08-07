import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragMove } from '@angular/cdk/drag-drop';
import { BombSettings } from 'src/app/models/classes/bomb-settings';
import { ManagerGame } from 'src/app/core/services/manager-game.service';
import { BombSettingsCreatorService } from '../../core/services/bomb-settings-creator.service';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../../reducers/index';
import { emitBomb } from '../../reducers/app.selectors';

@Component({
  selector: 'app-bombs-area',
  templateUrl: './bombs-area.component.html',
  styleUrls: ['./bombs-area.component.scss', './bomb/bomb.component.scss']
})
export class BombsAreaComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public bombSettings: BombSettings[] = [];

  constructor(protected managerGame: ManagerGame,
              private store: Store<State>) { }

  ngOnInit() {
    this.subscriptions.push(

        this.store.pipe(select(emitBomb)).subscribe((bombSettings: BombSettings) => {

        if (bombSettings === null) {
          return;
        }

        this.bombSettings.push(bombSettings);
      })

    );
  }

  onBombDrop(event: CdkDragDrop<BombSettings[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  dragMoved(event: CdkDragMove) {
  }

  dragEnded(event: CdkDragMove<BombSettings>) {
    this.managerGame.setBaseSizeBins();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
    this.subscriptions = [];
  }
}
