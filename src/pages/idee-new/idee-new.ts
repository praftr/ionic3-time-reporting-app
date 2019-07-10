import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IdeeProvider } from '../../providers/idee/idee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Idee } from '../../models/idee';
import { IdeeIndexPage } from '../idee-index/idee-index';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-idee-new',
  templateUrl: 'idee-new.html',
})
export class IdeeNewPage {
  private newForm: FormGroup;
  private idee: Idee;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ideeProvider: IdeeProvider,
    private formBuilder: FormBuilder,
    private storage: Storage
  ) {
    this.idee = new Idee();
    this.newForm = this.formBuilder.group({
      type: [Idee.TYPE],
      idee: ['', Validators.required],
      user_id: ['', Validators.required]
    });
    this.storage.get('user').then(user => this.idee.user_id = user._id);
  }

  ionViewDidLoad() {
  }

  public onSubmit() {
    this.ideeProvider.create(this.idee)
      .then(() => this.navCtrl.setRoot(IdeeIndexPage))
      .catch(err => console.error('idee creation failed', err));
  }

}
