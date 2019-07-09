import { Base } from './base';
import { Tache } from './tache';

export class Rapport extends Base {
  static readonly TYPE: string = 'rapport';

  type: string = Rapport.TYPE;
  duree: number;
  date: string;
  commentaire: string;
  tache_id: string;
  user_id: string;
  tache: Tache;
}

export const RapportViews = [
  {
    _id: '_design/rapports',
    views: {
      by_user: {
        map: function (doc) {
          if (doc.type === 'rapport') {
            //@ts-ignore
            emit(doc.user_id, null);
            //@ts-ignore
            emit(doc.user_id, { _id: doc.tache_id });
          }
        }.toString()
      }
    }
  }
];
