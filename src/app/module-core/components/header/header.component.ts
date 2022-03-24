// Core
import { Component, OnInit, OnDestroy } from '@angular/core';

// Rxjs
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// Services
import { BookmarksService } from './../../../services/bookmarks.service';

// Interfaces
import { newVerb } from './../../../interfaces/newVerb.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  public bookmarks: newVerb[] = [];
  private _unsubscribe = new Subject();

  constructor(private _bookmarksService: BookmarksService) { }

  ngOnInit(): void {
    this.bookmarks = this._bookmarksService.getBookmarks();
    this._bookmarksService.bookmarksUpdate.pipe(
                                            takeUntil(this._unsubscribe)
                                        ).subscribe((bookmarks: newVerb[]) => this.bookmarks = bookmarks);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }
}
