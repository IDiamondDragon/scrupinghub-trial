import { Injectable } from '@angular/core';
import { RandomValueGeneratorService } from './random-value-generator.service';


@Injectable()
export class ColorGeneratorService {
    private colors: string[] = ['#FF0000', '#1EBE1E', '#000000', '#0000FF', '#FF681F', '#FFC0CB'];
    colorBins: string[] = [];

    constructor(private randomValueGeneratorService: RandomValueGeneratorService,) {
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

    hexToRgbNew(hex, opacity: string) {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
      });

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

      if (result) {

        return 'rgba(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ',' + opacity + ')';
       } else {
        return null;
      }
    }
}
