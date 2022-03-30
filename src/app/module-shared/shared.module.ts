// Modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// Components
import { ErrorComponent } from './components/error/error.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SearchComponent } from './components/search/search.component';

// Pipes
import { SearchVerbkPipe } from '../pipes/search-bookmark.pipe';

@NgModule({
  declarations: [
    ErrorComponent,
    SearchVerbkPipe,
    LoaderComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PerfectScrollbarModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ErrorComponent,
    SearchVerbkPipe,
    FormsModule,
    LoaderComponent,
    SearchComponent
  ]
})
export class SharedModule { }
