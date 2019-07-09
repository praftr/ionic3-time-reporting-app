import { Base } from './base';
import { User } from './user';

export class Idee extends Base {
  static readonly TYPE: string = 'idee';

  type: string = Idee.TYPE;
  idee: string;
  user_id: string;
  user: User;
}

export const IdeeViews = [
  {
    _id: '_design/idees',
    views: {
      with_user: {
        map: function (doc) {
          if (doc.type === 'idee') {
            //@ts-ignore
            emit(doc.user_id, null);
            //@ts-ignore
            emit(doc.user_id, { _id: doc.user_id });
          }
        }.toString()
      }
    }
  }
];
