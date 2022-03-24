// Core
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// Rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { BookmarksService } from 'src/app/services/bookmarks.service';

// Interfaces
import { newVerb } from 'src/app/interfaces/newVerb.interface';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})

export class BookmarksComponent implements OnInit, OnDestroy {
  public bookmarks: newVerb[] = [];
  private _unsubscribe = new Subject();

  constructor(
    private _bookmarksService: BookmarksService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.bookmarks = this._bookmarksService.getBookmarks();

    this._bookmarksService.bookmarksUpdate
        .pipe(
          takeUntil(this._unsubscribe)
        ).subscribe((bookmarks: newVerb[]) => this.bookmarks = bookmarks);
  }

  public isBookmark(verb: newVerb): boolean {
    return this.bookmarks.some(bookmark => JSON.stringify(bookmark) === JSON.stringify(verb));
  }

  public deleteBookmark(verbID: string) {
    this._bookmarksService.deleteBookmark(verbID);

    if(!this.bookmarks.length) {
      this._router.navigate(['/verbs']);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }
}
