import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditfavoritesPageRoutingModule } from './editfavorites-routing.module';

import { EditfavoritesPage } from './editfavorites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditfavoritesPageRoutingModule
  ],
  declarations: [EditfavoritesPage]
})
export class EditfavoritesPageModule {}
