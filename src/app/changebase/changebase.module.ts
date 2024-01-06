import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangebasePageRoutingModule } from './changebase-routing.module';

import { ChangebasePage } from './changebase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangebasePageRoutingModule
  ],
  declarations: [ChangebasePage]
})
export class ChangebasePageModule {}
