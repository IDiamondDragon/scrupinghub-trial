import { Injectable } from '@angular/core';
import { RandomValueGeneratorService } from './random-value-generator.service';


@Injectable()
export class PositionService {
    private leftPadding = 35;
    private leftAndRightPaddings = this.leftPadding * 2;
    private heightBomb: number = 40;
    private percentageOfWindowHeightBombsArea = 0.8;

    constructor(private randomValueGeneratorService: RandomValueGeneratorService) {
    }

    getRandomX(): number {
      return this.randomValueGeneratorService.
          getRandomValue(this.leftPadding, window.innerWidth - this.leftAndRightPaddings - this.heightBomb);
    }

    getRandomY(): number {
      return this.randomValueGeneratorService.
          getRandomValue(0, window.innerHeight * this.percentageOfWindowHeightBombsArea - this.heightBomb);
    }
}
