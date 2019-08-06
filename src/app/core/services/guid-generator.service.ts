import { Injectable } from '@angular/core';

@Injectable()
export class GuidGeneratorService {

    constructor() {
    }

    guid() {

      return 'class' + (new Date().getTime()).toString(36);
    }
}
