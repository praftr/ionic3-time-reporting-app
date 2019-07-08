import { Base } from './base';

export class Tache extends Base {
  static readonly TYPE: string = 'tache';

  type: string = 'tache';
  nom: string;
  description: string;
  user_id: string;
  tache_id: string;
}
