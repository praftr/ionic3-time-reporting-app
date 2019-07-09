import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IdeeProvider } from '../../providers/idee/idee';
import { Idee } from '../../models/idee';
import { IdeeNewPage } from '../idee-new/idee-new';

@Component({
  selector: 'page-idee-index',
  templateUrl: 'idee-index.html',
})
export class IdeeIndexPage {
  private idees: Idee[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ideeProvider: IdeeProvider) {
  }

  async ionViewDidLoad() {
    const docs = await this.ideeProvider.getAllWithUser();
    this.idees = docs.filter(idee => idee.type === Idee.TYPE);
    this.idees.forEach(idee => {
      if (idee.user_id) {
        idee.user = (docs.filter(user => user._id === idee.user_id))[0];
      }
    });
  }

  public toIdeeNew() {
    this.navCtrl.push(IdeeNewPage);
  }

}
