// Modules
import { NgModule } from '@angular/core';
import { PracticeRoutingModule } from './practice-routing.module';
import { SharedModuleModule } from './../shared-module/shared-module.module';

// Components
import { PracticeComponent } from './components/practice/practice.component';

@NgModule({
  declarations: [
    PracticeComponent
  ],
  imports: [
    PracticeRoutingModule,
    SharedModuleModule
  ]
})
export class PracticeModule { }
