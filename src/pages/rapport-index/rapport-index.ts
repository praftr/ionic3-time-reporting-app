import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RapportProvider } from '../../providers/rapport/rapport';
import { Rapport } from '../../models/rapport';
import { ProjetProvider } from '../../providers/projet/projet';
import { RapportNewPage } from '../rapport-new/rapport-new';
import { ActiviteProvider } from '../../providers/activite/activite';

@Component({
  selector: 'page-rapport-index',
  templateUrl: 'rapport-index.html'
})
export class RapportIndexPage {
  private rapports: Rapport[];
  private user_id = '04802822de2af5cc4af53bac8c003378';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private rapportProvider: RapportProvider,
    private projetProvider: ProjetProvider,
    private activiteProvider: ActiviteProvider) {
  }

  ionViewDidLoad() {
    this.rapportProvider.getAllByUser(this.user_id)
      .then(docs => {
        this.rapports = docs.filter(doc => doc.type === Rapport.TYPE);
        this.rapports.forEach(async rapport => {
          const tache = (docs.filter(doc => rapport.tache_id === doc._id))[0];
          if (tache.projet_id) {
            tache.projet = await this.projetProvider.getOneById(tache.projet_id);
          }
          if (tache.activite_id) {
            tache.activite = await this.activiteProvider.getOneById(tache.activite_id);
          }
          rapport.tache = tache;
        });
      })
      .catch(err => console.error('error fetching rapports by user', err));
  }

  public toRapportNew() {
    this.navCtrl.push(RapportNewPage);
  }
}
