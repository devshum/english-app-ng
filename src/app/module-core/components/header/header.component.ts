// Core
import { Component, OnInit, OnDestroy } from '@angular/core';

// Rxjs
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// Services
import { BookmarksStorageService } from '../../../services/bookmarksStorage.service';

// Interfaces
import { newVerb } from './../../../interfaces/newVerb.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  public bookmarks: newVerb[] = [];
  public flashClass = false;

  private _unsubscribe = new Subject();

  constructor(private _bookmarksStorageService: BookmarksStorageService) { }

  ngOnInit(): void {
    this.bookmarks = this._bookmarksStorageService.getBookmarks();

    this._bookmarksStorageService.bookmarksUpdate.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe((bookmarks: newVerb[]) => this.bookmarks = bookmarks);

    this._bookmarksStorageService.getFlashClass.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe(flashClass => {
      console.log(this.flashClass);
      this.flashClass = flashClass;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }
}
