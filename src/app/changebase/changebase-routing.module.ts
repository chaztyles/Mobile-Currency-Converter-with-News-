import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangebasePage } from './changebase.page';

const routes: Routes = [
  {
    path: '',
    component: ChangebasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangebasePageRoutingModule {}
