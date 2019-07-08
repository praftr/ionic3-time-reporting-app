import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { Rapport } from '../../models/rapport';

@Injectable()
export class RapportProvider extends BaseProvider {

  public getAll(): Promise<any> {
    return this.getAllByType(Rapport.TYPE);
  }

  public getAllByUser(userId: string): Promise<any> {
    return this.getAllBy('rapports/by_user', {
      key: userId,
      include_docs: true
    }).then(rows => Promise.resolve(rows.map(row => row.doc)))
      .catch(err => Promise.reject(err));
  }

}
