// Modules
import { NgModule } from '@angular/core';
import { VerbsRoutingModule } from './verbs-routing.module';
import { SharedModule } from './../module-shared/shared.module';

// Components
import { VerbsComponent } from './components/verbs/verbs.component';
import { TableComponent } from './components/table/table.component';
import { TabviewComponent } from './components/tabview/tabview.component';
import { SearchComponent } from './components/search/search.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    VerbsComponent,
    TableComponent,
    TabviewComponent,
    SearchComponent,
    PaginationComponent
  ],
  imports: [
    SharedModule,
    VerbsRoutingModule
  ]
})
export class VerbsModule { }
