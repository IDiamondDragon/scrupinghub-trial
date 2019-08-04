import { Injectable } from '@angular/core';


@Injectable()
export class RandomValueGeneratorService {

    public getRandomValue(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min)) + min;
    }
}
