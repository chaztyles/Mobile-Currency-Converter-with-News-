import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangetargetPage } from './changetarget.page';

const routes: Routes = [
  {
    path: '',
    component: ChangetargetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangetargetPageRoutingModule {}
