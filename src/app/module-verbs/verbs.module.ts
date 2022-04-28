// Modules
import { NgModule } from '@angular/core';
import { VerbsRoutingModule } from './verbs-routing.module';
import { SharedModule } from './../module-shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';

// Components
import { VerbsComponent } from './components/verbs/verbs.component';
import { TableComponent } from './components/table/table.component';
import { TabviewComponent } from './components/tabview/tabview.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    VerbsComponent,
    TableComponent,
    TabviewComponent,
    SearchComponent
  ],
  imports: [
    SharedModule,
    VerbsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginatorModule
  ]
})
export class VerbsModule { }
