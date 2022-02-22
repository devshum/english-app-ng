import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  { path: 'home', loadChildren: () => import('./home-module/home.module').then(m => m.HomeModule) },
  { path: 'verbs', loadChildren: () => import('./verbs-module/verbs.module').then(m => m.VerbsModule) },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
