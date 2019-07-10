import { Component } from '@angular/core';
import { MenuController, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { RapportIndexPage } from '../rapport-index/rapport-index';
import { Events } from 'ionic-angular';

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
    public events: Events
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
        // Let other pages user is logged in
        this.events.publish('user:connected', user);
        // Store user in localStorage
        await this.storage.set('user', user);
        // Re-enable side menu "mainMenu"
        this.menuCtrl.enable(true, 'mainMenu');
        this.navCtrl.setRoot(RapportIndexPage);
      })
      .catch(err => this.error = err);
  }

}
