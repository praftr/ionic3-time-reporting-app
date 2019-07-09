import { Base } from './base';

export class Activite extends Base {
  static readonly TYPE: string = 'activite';

  type: string = Activite.TYPE;
  nom: string;
}

export const ActiviteViews = [];
