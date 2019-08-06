import { Injectable } from '@angular/core';
import { RandomValueGeneratorService } from './random-value-generator.service';


@Injectable()
export class ColorGeneratorService {
    private colors: string[] = ['red', 'green', 'black', 'blue', 'orange', 'pink'];

    constructor(private randomValueGeneratorService: RandomValueGeneratorService) {
    }

     getColor(): string {
      const indexColor = this.randomValueGeneratorService.getRandomValue(0, this.colors.length);

      return this.colors[indexColor];
    }

    getRandomColorExcept(exceptionColors: string[]): string {
      const colors = this.colors.filter((color) => {
        return exceptionColors.indexOf(color) < 0;
      });

      const indexColor = this.randomValueGeneratorService.getRandomValue(0, colors.length);

      return colors[indexColor];
    }

    getRandomColorFrom(colors: string[]): string {
      const indexColor = this.randomValueGeneratorService.getRandomValue(0, colors.length);

      return colors[indexColor];
    }
}
