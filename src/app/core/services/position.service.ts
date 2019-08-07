import { Injectable } from '@angular/core';
import { RandomValueGeneratorService } from './random-value-generator.service';


@Injectable()
export class PositionService {

    constructor(private randomValueGeneratorService: RandomValueGeneratorService) {
    }

    getRandomCell(): string {
      return 'c' + this.randomValueGeneratorService.getRandomValue(0, 168);
    }

}
