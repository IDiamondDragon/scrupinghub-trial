import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BombSettings } from 'src/app/models/classes/bomb-settings';
import { ManagerGame } from 'src/app/core/services/manager-game.service';
import { BombSettingsCreatorService } from '../../core/services/bomb-settings-creator.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bombs-area',
  templateUrl: './bombs-area.component.html',
  styleUrls: ['./bombs-area.component.scss']
})
export class BombsAreaComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public bombSettings: BombSettings[] = [];

  constructor(protected managerGame: ManagerGame, private bombSettingsCreatorService: BombSettingsCreatorService) { }

  ngOnInit() {
    this.subscriptions.push(

      this.managerGame.emitBomb.subscribe(value => {
        this.bombSettings.push(this.bombSettingsCreatorService.create());
      })

    );
  }

  onBombDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
    this.subscriptions = [];
  }
}
