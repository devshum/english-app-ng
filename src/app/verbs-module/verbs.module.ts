// Modules
import { NgModule } from '@angular/core';
import { VerbsRoutingModule } from './verbs-routing.module';
import { SharedModuleModule } from './../shared-module/shared-module.module';

// Components
import { VerbsComponent } from './components/verbs/verbs.component';


@NgModule({
  declarations: [
    VerbsComponent
  ],
  imports: [
    SharedModuleModule,
    VerbsRoutingModule
  ]
})
export class VerbsModule { }
