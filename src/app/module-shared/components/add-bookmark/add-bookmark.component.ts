// Core
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Components
import { newVerb } from 'src/app/interfaces/newVerb.interface';

// Services
import { BookmarksStorageService } from 'src/app/services/bookmarksStorage.service';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {
  @Input() bookmark: newVerb;

  private _bookmarks: newVerb[];
  private _unsubscribe = new Subject();

  constructor(private _bookmarksStorageService: BookmarksStorageService) { }

  ngOnInit(): void {
    this._bookmarks = this._bookmarksStorageService.getBookmarks();

    this._bookmarksStorageService.bookmarksUpdate.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe((bookmarks: newVerb[]) => this._bookmarks = bookmarks);
  }

  public isBookmark(verb: newVerb): boolean {
    return this._bookmarks.some(bookmark => JSON.stringify(bookmark) === JSON.stringify(verb));
  }

  public addBookmark(verb: newVerb): void {
    this._bookmarksStorageService.addBookmark(verb);
  }

  public deleteBookmark(verbID: string): void {
    this._bookmarksStorageService.deleteBookmark(verbID);
  }

}
