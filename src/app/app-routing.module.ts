import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'practice'
  },
  { path: 'practice', loadChildren: () => import('./module-practice/practice.module').then(m => {
    console.log(m);
    return m.PracticeModule;
  }) },
  { path: 'verbs', loadChildren: () => import('./module-verbs/verbs.module').then(m => m.VerbsModule) },
  { path: 'bookmarks', loadChildren: () => import('./module-bookmarks/bookmarks.module').then(m => m.BookmarksModule) },
  {
    path: '**',
    redirectTo: 'practice'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
