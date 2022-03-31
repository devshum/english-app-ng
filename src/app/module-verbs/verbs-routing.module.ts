// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { VerbsAllComponent } from './components/verbs-all/verbs-all.component';
import { VerbsSearchComponent } from './components/verbs-search/verbs-search.component';
import { VerbsComponent } from './components/verbs/verbs.component';

const routes: Routes = [
  { path: '', component: VerbsComponent,
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'all', component: VerbsAllComponent },
      { path: 'search', component: VerbsSearchComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerbsRoutingModule { }
