// Modules
import { NgModule } from '@angular/core';
import { PracticeRoutingModule } from './practice-routing.module';
import { SharedModuleModule } from './../shared-module/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';

// Components
import { PracticeComponent } from './components/practice/practice.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    PracticeComponent,
    FormComponent
  ],
  imports: [
    PracticeRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    InlineSVGModule.forRoot({ baseUrl: '/assets/icons/', bypassHttpClientInterceptorChain: true })
  ]
})
export class PracticeModule { }
