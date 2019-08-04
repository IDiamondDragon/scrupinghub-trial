import { NgModule, Optional, SkipSelf } from '@angular/core';

import { EnsureModuleLoadedOnceGuard } from '../models/classes/ensureModuleLoadedOnceGuard';
import { PositionService } from './services/position.service';
import { ManagerGame } from './services/manager-game.service';
import { RandomValueGeneratorService } from './services/random-value-generator.service';
import { ColorGeneratorService } from './services/color-generator.service';
import { BombSettingsCreatorService } from './services/bomb-settings-creator.service';
import { GuidGeneratorService } from './services/guid-generator.service copy';

@NgModule({
  providers: [
      GuidGeneratorService,
      BombSettingsCreatorService,
      ColorGeneratorService,
      RandomValueGeneratorService,
      PositionService,
      ManagerGame
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {    // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}
