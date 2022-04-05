// Modules
import { NgModule } from '@angular/core';
import { PracticeRoutingModule } from './practice-routing.module';
import { SharedModule } from './../module-shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

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
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PracticeModule { }
