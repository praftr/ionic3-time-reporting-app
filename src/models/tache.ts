import { Base } from './base';
import { Projet } from './projet';
import { Activite } from './activite';

export class Tache extends Base {
  static readonly TYPE: string = 'tache';

  type: string = Tache.TYPE;
  nom: string;
  description: string;
  user_id: string;
  projet_id: string;
  projet: Projet;
  activite_id: string;
  activite: Activite;
}

export const TacheViews = [];
