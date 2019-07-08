import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { Projet } from '../../models/projet';

@Injectable()
export class ProjetProvider extends BaseProvider {

  public getAll(): Promise<any> {
    return this.getAllByType(Projet.TYPE);
  }

}
