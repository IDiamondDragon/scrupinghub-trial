import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BombSettings } from 'src/app/models/classes/bomb-settings';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { ManagerGame } from '../../../core/services/manager-game.service';
import { Subscription } from 'rxjs';
import { ColorGeneratorService } from '../../../core/services/color-generator.service';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss']
})
export class BinComponent implements OnInit, OnDestroy {
  @Input()
  id: string;

  color: string;
  increaseSizeBin: boolean;

  public bombs: BombSettings[] = [];
  private subscriptions: Subscription[] = [];

  constructor(protected managerGame: ManagerGame, protected colorGeneratorService: ColorGeneratorService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.managerGame.changeColorBins.subscribe(value => {
        const color = this.colorGeneratorService.getRandomColorExcept(this.managerGame.colorBins);

        this.managerGame.colorBins.push(color);

        this.color = color;

        if (this.managerGame.colorBins.length === this.managerGame.idBins.length) {
          this.managerGame.updateBombsColor();
        }
      }),

      this.managerGame.settedBaseSizeBins.subscribe(value => {

        if (value) {
          this.increaseSizeBin = false;
        }
      })
    );
  }

  onBombDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const bomb: BombSettings = event.previousContainer.data[event.previousIndex];

      if (this.color === bomb.color) {
        this.managerGame.bombsInBins.push(bomb);
        this.managerGame.removeBomb(bomb, true);
      } else {
        this.managerGame.removeBomb(bomb, false);
      }

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  /** Predicate function that only allows even numbers to be dropped into a list. */
  colorPredicate(item: CdkDrag<BombSettings>) {

    if (item.data.color === this.color) {
      this.increaseSizeBin = true;
    }

    return true;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
    this.subscriptions = [];
  }
}
