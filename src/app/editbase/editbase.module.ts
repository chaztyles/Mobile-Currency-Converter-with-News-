import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditbasePageRoutingModule } from './editbase-routing.module';

import { EditbasePage } from './editbase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditbasePageRoutingModule,
  ],
  declarations: [EditbasePage]
})
export class EditbasePageModule {}
