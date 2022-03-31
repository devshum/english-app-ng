// Modules
import { NgModule } from '@angular/core';
import { VerbsRoutingModule } from './verbs-routing.module';
import { SharedModule } from './../module-shared/shared.module';

// Components
import { VerbsComponent } from './components/verbs/verbs.component';
import { VerbsAllComponent } from './components/verbs-all/verbs-all.component';
import { VerbsSearchComponent } from './components/verbs-search/verbs-search.component';

@NgModule({
  declarations: [
    VerbsComponent,
    VerbsAllComponent,
    VerbsSearchComponent
  ],
  imports: [
    SharedModule,
    VerbsRoutingModule
  ]
})
export class VerbsModule { }
