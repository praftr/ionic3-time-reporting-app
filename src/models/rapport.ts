import { Base } from './base';

export class Rapport extends Base {
  static readonly TYPE: string = 'rapport';

  type: string = 'rapport';
  duree: number;
  commentaire: string;
  tache_id: string;
  user_id: string;
}
