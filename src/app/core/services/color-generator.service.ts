import { Injectable } from '@angular/core';
import { RandomValueGeneratorService } from './random-value-generator.service';


@Injectable()
export class ColorGeneratorService {
    private colors: string[] = ['red', 'green', 'black', 'blue', 'yellow'];

    constructor(private randomValueGeneratorService: RandomValueGeneratorService) {
    }

    getColor(): string {
      const indexColor = this.randomValueGeneratorService.getRandomValue(0, this.colors.length - 1);

      return this.colors[indexColor];
    }
}
