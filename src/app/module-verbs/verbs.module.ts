// Modules
import { NgModule } from '@angular/core';
import { VerbsRoutingModule } from './verbs-routing.module';
import { SharedModule } from './../module-shared/shared.module';

// Components
import { VerbsComponent } from './components/verbs/verbs.component';

@NgModule({
  declarations: [
    VerbsComponent
  ],
  imports: [
    SharedModule,
    VerbsRoutingModule
  ]
})
export class VerbsModule { }
