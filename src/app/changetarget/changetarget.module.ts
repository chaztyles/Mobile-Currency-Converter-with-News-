import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangetargetPageRoutingModule } from './changetarget-routing.module';

import { ChangetargetPage } from './changetarget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangetargetPageRoutingModule
  ],
  declarations: [ChangetargetPage]
})
export class ChangetargetPageModule {}
