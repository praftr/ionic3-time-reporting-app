import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CouchDBFactory } from '../providers/couch-db/couch-db-factory';
import { RapportIndexPage } from '../pages/rapport-index/rapport-index';
import { IdeeIndexPage } from '../pages/idee-index/idee-index';
import { UserLoginPage } from '../pages/user-login/user-login';
import { User } from '../models/user';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = UserLoginPage;

  pages: Array<{title: string, icon: string, component: any}>;

  user: User;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private couchDBFactory: CouchDBFactory,
    public events: Events,
    private storage: Storage
  ) {
    this.initializeApp();
    this.couchDBFactory.createCouchDB();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Saisies', icon: 'stopwatch', component: RapportIndexPage },
      { title: 'Idées', icon: 'bulb', component: IdeeIndexPage },
    ];

    // Get the user as soon as he's connected
    events.subscribe('user:connected', user => this.user = user);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOut() {
    this.storage.remove('user');
    this.nav.setRoot(UserLoginPage);
  }
}
