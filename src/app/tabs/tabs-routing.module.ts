import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'loginsucess',
        loadChildren: () => import('../loginsucess/loginsucess.module').then( m => m.LoginsucessPageModule)
      },
      {
        path: 'assistanceregistry',
        loadChildren: () => import('../assistanceregistry/assistanceregistry.module').then( m => m.AssistanceregistryPageModule)
      },
      {
        path: 'assistancescanqr',
        loadChildren: () => import('../assistancescanqr/assistancescanqr.module').then( m => m.AssistancescanqrPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
