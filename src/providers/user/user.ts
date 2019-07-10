import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';

@Injectable()
export class UserProvider extends BaseProvider {

  public login(email: string, password: string): Promise<any> {
    const query = {
      selector: {
        email: { $eq: email },
        password: { $eq: password }
      }
    };
    return this.dom.findDoc(query)
      .then(user => {
        if (user.length === 0) {
          throw Error('Aucun utilisateur n\'a été trouvé');
        }
        return Promise.resolve(user[0])
      })
      .catch(err => Promise.reject(err));
  }

}
