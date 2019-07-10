import { Base } from './base';

export class User extends Base {
  static readonly TYPE: string = 'user';
  static readonly ROLE_USER: string = 'ROLE_USER';
  static readonly ROLE_ADMIN: string = 'ROLE_ADMIN';
  static readonly PREFA: string = 'PREFA';
  static readonly BPE: string = 'BPE';

  type: string = User.TYPE;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  roles: string = User.ROLE_USER;
  rgpd: boolean = false;
  metier: string;
}

export const UserViews = [];
