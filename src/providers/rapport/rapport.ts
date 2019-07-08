import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { Rapport } from '../../models/rapport';

@Injectable()
export class RapportProvider extends BaseProvider {

  public getAll(): Promise<any> {
    return this.getAllByType(Rapport.TYPE);
  }

}
