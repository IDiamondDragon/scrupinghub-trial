import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { PositionService } from '../../core/services/position.service';

@Component({
  selector: 'app-bomb',
  templateUrl: './bomb.component.html',
  styleUrls: ['./bomb.component.scss']
})
export class BombComponent implements OnInit {

  @HostBinding('style.top')
    top = this.positionService.getRandomY() + 'px';

  @HostBinding('style.left')
    left = this.positionService.getRandomX() + 'px';

  @HostBinding('style.background-color')
  @Input()
    color: string = 'black';

  constructor(private positionService: PositionService) { }

  ngOnInit() {
  }

}
