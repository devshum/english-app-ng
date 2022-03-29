// Core
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// Rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { BookmarksStorageService } from 'src/app/services/bookmarksStorage.service';

// Interfaces
import { newVerb } from 'src/app/interfaces/newVerb.interface';
import { SearchStorageService } from 'src/app/services/searchStorage.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})

export class BookmarksComponent implements OnInit, OnDestroy {
  public bookmarks: newVerb[] = [];
  public searchValue: string;
  private _unsubscribe = new Subject();

  constructor(
    private _searchStorageService: SearchStorageService,
    private _bookmarksStorageService: BookmarksStorageService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.bookmarks = this._bookmarksStorageService.getBookmarks();
    this._getBookmarkSearch();

    this._bookmarksStorageService.bookmarksUpdate.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe((bookmarks: newVerb[]) => this.bookmarks = bookmarks);
  }

  public isBookmark(verb: newVerb): boolean {
    return this.bookmarks.some(bookmark => JSON.stringify(bookmark) === JSON.stringify(verb));
  }

  public deleteBookmark(verbID: string): void {
    this._bookmarksStorageService.deleteBookmark(verbID);

    if(!this.bookmarks.length) {
      this._router.navigate(['/verbs']);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }

  public onSearchBookmarkValue(searchBookmarkValue: string): void {
    this._searchStorageService.storeBookmarkSearch(searchBookmarkValue);
    this._getBookmarkSearch();
  }

  private _getBookmarkSearch(): void {
    this.searchValue = this._searchStorageService.getSearchBookmarkValue();
  }
}
