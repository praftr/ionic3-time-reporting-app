import { Component } from '@angular/core';
import { MenuController, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { RapportIndexPage } from '../rapport-index/rapport-index';
import { Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { User } from '../../models/user';

@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLoginPage {
  private loginForm: FormGroup;
  private error: string = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private userProvider: UserProvider,
    private formBuilder: FormBuilder,
    private storage: Storage,
    public events: Events,
    public alertCtrl: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
    // Disable side menu "mainMenu"
    this.menuCtrl.enable(false, 'mainMenu');
  }

  public onSubmit(form: FormGroup) {
    this.error = null;

    const email = form.getRawValue().email;
    const password = form.getRawValue().password;

    this.userProvider.login(email, password)
      .then(async user => {
        if (!user.rgpd) {
          this.showConfirm(user);
        } else {
          this.userLogin(user);
        }
      })
      .catch(err => this.error = err);
  }

  private async userLogin(user: User) {
    // Let other pages user is logged in
    this.events.publish('user:connected', user);
    // Store user in localStorage
    await this.storage.set('user', user);
    // Re-enable side menu "mainMenu"
    this.menuCtrl.enable(true, 'mainMenu');
    this.navCtrl.setRoot(RapportIndexPage);
  }

  private showConfirm(user: User) {
    const confirm = this.alertCtrl.create({
      title: 'Condition d\'utilisation.',
      message: 'En utilisant cette application, vous acceptez que les informations saisies soient la propriété de la société Edycem',
      buttons: [
        {
          text: 'Je ne suis pas d\'accord',
          handler: () => {
            this.error = 'Vous n\'avez pas accepté les condition d\'utilisation';
          }
        },
        {
          text: 'Je suis d\'accord',
          handler: async () => {
            user.rgpd = true;
            await this.userProvider.update(user);
            await this.userLogin(user);
          }
        }
      ]
    });
    confirm.present();
  }

}
