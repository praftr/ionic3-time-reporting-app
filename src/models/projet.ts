import { Base } from './base';

export class Projet extends Base {
  static readonly TYPE: string = 'projet';

  type: string = Projet.TYPE;
  numero: string;
  societe: string;
  demandeur: string;
  site: string;
  nom: string;
  priorite: string;
  chaire: boolean;
  echeance: number;
  objectif: string;
}

export const ProjetViews = [];
