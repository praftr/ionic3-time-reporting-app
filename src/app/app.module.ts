import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RapportNewPage } from '../pages/rapport-new/rapport-new';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CouchDBProvider } from '../providers/couch-db/couch-db';
import { UserProvider } from '../providers/user/user';
import { CouchDBFactory } from '../providers/couch-db/couch-db-factory';
import { RapportProvider } from '../providers/rapport/rapport';
import { ProjetProvider } from '../providers/projet/projet';
import { TacheProvider } from '../providers/tache/tache';
import { BaseProvider } from '../providers/base/base';
import { RapportIndexPage } from '../pages/rapport-index/rapport-index';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RapportNewPage,
    RapportIndexPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RapportNewPage,
    RapportIndexPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CouchDBProvider,
    CouchDBFactory,
    UserProvider,
    RapportProvider,
    ProjetProvider,
    TacheProvider,
    BaseProvider
  ]
})
export class AppModule {}
