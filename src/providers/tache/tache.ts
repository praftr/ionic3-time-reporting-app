import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { Tache } from '../../models/tache';

@Injectable()
export class TacheProvider extends BaseProvider {

  public getAll(): Promise<Tache[]> {
    return this.getAllByType(Tache.TYPE);
  }

  public getAllByProjet(projet_id: string): Promise<Tache[]> {
    const query = {
      selector: {
        type: { $eq: Tache.TYPE },
        projet_id: { $eq: projet_id }
      }
    };
    return this.dom.findDocs(query);
  }

}
