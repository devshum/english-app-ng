import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerbsComponent } from './components/verbs/verbs.component';

const routes: Routes = [{ path: '', component: VerbsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerbsRoutingModule { }
