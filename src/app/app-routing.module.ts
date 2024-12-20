import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'register', // Redirect the default route to the register page
    pathMatch: 'full',
  },
  {
    path: 'assistanceregistry/:id',
    loadChildren: () =>
      import('./assistanceregistry/assistanceregistry.module').then(
        (m) => m.AssistanceregistryPageModule
      ),
  },
  {
    path: 'assistancescanqr',
    loadChildren: () =>
      import('./assistancescanqr/assistancescanqr.module').then(
        (m) => m.AssistancescanqrPageModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'assistancestudent/:id',
    loadChildren: () =>
      import('./assistancestudent/assistancestudent.module').then(
        (m) => m.AssistancestudentPageModule
      ),
  },
  {
    path: 'assistancegenerate/:id',
    loadChildren: () =>
      import('./assistancegenerate/assistancegenerate.module').then(
        (m) => m.AssistancegeneratePageModule
      ),
  },
  {
    path: 'assistanceprof',
    loadChildren: () =>
      import('./assistanceprof/assistanceprof.module').then(
        (m) => m.AssistanceprofPageModule
      ),
  },
  {
    path: 'assistanceregistry1',
    loadChildren: () =>
      import('./assistanceregistry1/assistanceregistry1.module').then(
        (m) => m.Assistanceregistry1PageModule
      ),
  },
  {
    path: 'assistancestudent1',
    loadChildren: () =>
      import('./assistancestudent1/assistancestudent1.module').then(
        (m) => m.Assistancestudent1PageModule
      ),
  },
  {
    path: 'assistanceregistrystu',
    loadChildren: () =>
      import('./assistanceregistrystu/assistanceregistrystu.module').then(
        (m) => m.AssistanceregistrystuPageModule
      ),
  },
  {
    path: 'assistancegeneratespec',
    loadChildren: () =>
      import('./assistancegeneratespec/assistancegeneratespec.module').then(
        (m) => m.AssistancegeneratespecPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'adminpanel',
    loadChildren: () =>
      import('./adminpanel/adminpanel.module').then(
        (m) => m.AdminpanelPageModule
      ),
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
