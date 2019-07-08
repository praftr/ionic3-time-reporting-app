import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RapportNewPage } from './rapport-new';

@NgModule({
  declarations: [
    RapportNewPage,
  ],
  imports: [
    IonicPageModule.forChild(RapportNewPage),
  ],
})
export class RapportNewPageModule {}
