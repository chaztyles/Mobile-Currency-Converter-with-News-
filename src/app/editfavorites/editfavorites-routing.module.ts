import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditfavoritesPage } from './editfavorites.page';

const routes: Routes = [
  {
    path: '',
    component: EditfavoritesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditfavoritesPageRoutingModule {}
