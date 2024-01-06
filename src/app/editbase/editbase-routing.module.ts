import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditbasePage } from './editbase.page';

const routes: Routes = [
  {
    path: '',
    component: EditbasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditbasePageRoutingModule {}
