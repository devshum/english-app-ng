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
import { BtnComponent } from './components/btn/btn.component';
import { AddBookmarkComponent } from './components/add-bookmark/add-bookmark.component';

@NgModule({
  declarations: [
    ErrorComponent,
    SearchVerbkPipe,
    LoaderComponent,
    SearchComponent,
    BtnComponent,
    AddBookmarkComponent
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
    SearchComponent,
    BtnComponent,
    AddBookmarkComponent
  ]
})
export class SharedModule { }
