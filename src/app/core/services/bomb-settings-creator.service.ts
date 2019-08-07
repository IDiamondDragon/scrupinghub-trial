import { Injectable } from '@angular/core';
import { ColorGeneratorService } from './color-generator.service';
import { BombSettings } from '../../models/classes/bomb-settings';
import { GuidGeneratorService } from './guid-generator.service';

@Injectable()
export class BombSettingsCreatorService {

    constructor(private colorGeneratorService: ColorGeneratorService,
                private guidGeneratorService: GuidGeneratorService) {
    }

    create(): BombSettings {
      console.log("color bins: " + this.colorGeneratorService.colorBins)
      const color: string = this.colorGeneratorService.getRandomColorFrom(this.colorGeneratorService.colorBins);
      const id: string = this.guidGeneratorService.guid();

      return new BombSettings(id, color);
    }
}
