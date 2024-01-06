import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'editbase',
    loadChildren: () => import('./editbase/editbase.module').then( m => m.EditbasePageModule)
  },
  {
    path: 'editfavorites',
    loadChildren: () => import('./editfavorites/editfavorites.module').then( m => m.EditfavoritesPageModule)
  },
  {
    path: 'changebase',
    loadChildren: () => import('./changebase/changebase.module').then( m => m.ChangebasePageModule)
  },
  {
    path: 'changetarget',
    loadChildren: () => import('./changetarget/changetarget.module').then( m => m.ChangetargetPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
