import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { SearchVerbkPipe } from '../pipes/search-bookmark.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ErrorComponent,
    SearchVerbkPipe
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
    FormsModule
  ]
})
export class SharedModule { }
