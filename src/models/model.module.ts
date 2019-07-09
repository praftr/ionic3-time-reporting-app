import { RapportViews } from './rapport';
import { UserViews } from './user';
import { ProjetViews } from './projet';
import { TacheViews } from './tache';
import { ActiviteViews } from './activite';
import { IdeeViews } from './idee';

export const Views = [
  ...RapportViews,
  ...UserViews,
  ...ProjetViews,
  ...TacheViews,
  ...ActiviteViews,
  ...IdeeViews
];
