import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';

@Injectable()
export class IdeeProvider extends BaseProvider {

  public getAllWithUser(): Promise<any> {
    return this.getAllBy('idees/with_user', { include_docs: true })
      .then(rows => Promise.resolve(rows.map(row => row.doc)))
      .catch(err => Promise.reject(err));
  }

}
