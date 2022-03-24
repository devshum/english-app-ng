// Modules
import { NgModule } from '@angular/core';
import { BookmarksRoutingModule } from './bookmarks-routing.module';
import { SharedModule } from '../module-shared/shared.module';

// Components
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';

@NgModule({
  declarations: [BookmarksComponent],
  imports: [BookmarksRoutingModule, SharedModule]
})
export class BookmarksModule { }
