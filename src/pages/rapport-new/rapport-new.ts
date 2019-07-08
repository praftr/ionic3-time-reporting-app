import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rapport } from '../../models/rapport';
import { Tache } from '../../models/tache';
import { TacheProvider } from '../../providers/tache/tache';
import { RapportProvider } from '../../providers/rapport/rapport';
import { ProjetProvider } from '../../providers/projet/projet';
import { Projet } from '../../models/projet';

@IonicPage()
@Component({
  selector: 'page-rapport-new',
  templateUrl: 'rapport-new.html'
})
export class RapportNewPage {
  private newForm: FormGroup;
  private rapport: Rapport;
  private taches: Tache[];
  private projets: Projet[];
  private projet: Projet; // Current selected projet to filter Taches

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProviser: UserProvider,
    private tacheProvider: TacheProvider,
    private rapportProvider: RapportProvider,
    private projetProvider: ProjetProvider,
    private formBuilder: FormBuilder
  ) {
    this.rapport = new Rapport();
    this.newForm = this.formBuilder.group({
      type: ['rapport'],
      duree: ['', Validators.required],
      commentaire: ['', Validators.required],
      user_id: ['', Validators.required],
      tache_id: ['', Validators.required]
    });
    this.projet = new Projet();
    // todo: Get the user's id from the current logged user
    this.rapport.user_id = '04802822de2af5cc4af53bac8c003378'
  }

  async ionViewDidLoad() {
    this.projets = await this.projetProvider.getAll();
  }

  public async onChange(projet_id: string) {
    this.taches = await this.tacheProvider.getAllByProjet(projet_id);
  }

  public onSubmit() {
    this.rapportProvider.create(this.rapport)
      .then(response => console.log('rapport created successfully', response))
      .catch(err => console.error('rapport creation failed', err));
  }

}
