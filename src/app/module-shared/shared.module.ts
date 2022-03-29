import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { SearchVerbkPipe } from '../pipes/search-bookmark.pipe';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { SearchComponent } from './components/search/search.component';

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
    FormsModule
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
