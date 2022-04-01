// Modules
import { NgModule } from '@angular/core';
import { VerbsRoutingModule } from './verbs-routing.module';
import { SharedModule } from './../module-shared/shared.module';

// Components
import { VerbsComponent } from './components/verbs/verbs.component';
import { TableComponent } from './components/table/table.component';
import { TabviewComponent } from './components/tabview/tabview.component';

@NgModule({
  declarations: [
    VerbsComponent,
    TableComponent,
    TabviewComponent
  ],
  imports: [
    SharedModule,
    VerbsRoutingModule
  ]
})
export class VerbsModule { }
