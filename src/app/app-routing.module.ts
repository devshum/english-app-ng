import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'practice'
  },
  { path: 'practice', loadChildren: () => import('./practice-module/practice.module').then(m => m.PracticeModule) },
  { path: 'verbs', loadChildren: () => import('./verbs-module/verbs.module').then(m => m.VerbsModule) },
  {
    path: '**',
    redirectTo: 'practice'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
