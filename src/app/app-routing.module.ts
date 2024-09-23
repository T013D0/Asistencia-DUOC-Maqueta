import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'loginsucess',
    loadChildren: () => import('./loginsucess/loginsucess.module').then( m => m.LoginsucessPageModule)
  },
  {
    path: 'assistanceregistry',
    loadChildren: () => import('./assistanceregistry/assistanceregistry.module').then( m => m.AssistanceregistryPageModule)
  },
  {
    path: 'assistancescanqr',
    loadChildren: () => import('./assistancescanqr/assistancescanqr.module').then( m => m.AssistancescanqrPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
