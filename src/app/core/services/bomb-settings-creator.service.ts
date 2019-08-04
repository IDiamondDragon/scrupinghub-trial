import { Injectable } from '@angular/core';
import { RandomValueGeneratorService } from './random-value-generator.service';
import { ColorGeneratorService } from './color-generator.service';
import { BombSettings } from '../../models/classes/bomb-settings';
import { GuidGeneratorService } from './guid-generator.service copy';


@Injectable()
export class BombSettingsCreatorService {

    constructor(private colorGeneratorService: ColorGeneratorService,
                private guidGeneratorService: GuidGeneratorService) {
    }

    create(): BombSettings {
      const color: string = this.colorGeneratorService.getColor();
      const id: string = this.guidGeneratorService.guid();

      return new BombSettings(id, color);
    }
}
