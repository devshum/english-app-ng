// Modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { InlineSVGModule } from 'ng-inline-svg-2';

// Components
import { ErrorComponent } from './components/error/error.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AddBookmarkComponent } from './components/add-bookmark/add-bookmark.component';
import { VerbComponent } from './components/verb/verb.component';
import { BtnComponent } from './components/btn/btn.component';

// Pipes
import { SearchVerbkPipe } from '../pipes/search-bookmark.pipe';

@NgModule({
  declarations: [
    ErrorComponent,
    SearchVerbkPipe,
    LoaderComponent,
    BtnComponent,
    AddBookmarkComponent,
    VerbComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PerfectScrollbarModule,
    InlineSVGModule.forRoot({ baseUrl: '/assets/icons/', bypassHttpClientInterceptorChain: true })
  ],
  exports: [
    CommonModule,
    RouterModule,
    ErrorComponent,
    SearchVerbkPipe,
    FormsModule,
    LoaderComponent,
    BtnComponent,
    VerbComponent,
    AddBookmarkComponent,
    PerfectScrollbarModule,
    InlineSVGModule
  ]
})
export class SharedModule { }
