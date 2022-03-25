import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { newVerb } from '../interfaces/newVerb.interface';

@Injectable({
  providedIn: 'root'
})

export class BookmarksStorageService {
  public bookmarksUpdate: Subject<newVerb[]> = new Subject<newVerb[]>();
  private _bookmarks: newVerb[] = [];

  constructor() { }

  public getBookmarks(): newVerb[] {
    if(localStorage.getItem('Bookmarks')) {
      return JSON.parse(localStorage.getItem('Bookmarks') || '{}');
    }

    return [];
  }

  public addBookmark(verb: newVerb): void {
    if(localStorage.getItem('Bookmarks')) {
      this._bookmarks = JSON.parse(localStorage.getItem('Bookmarks') || '{}');
      this._bookmarks = [...this._bookmarks, verb];
      this.bookmarksUpdate.next([...this._bookmarks]);
    } else {
      this._bookmarks = [verb];
    }

    localStorage.setItem('Bookmarks', JSON.stringify([...this._bookmarks]));
  }

  public deleteBookmark(verbID: string): void {
    this._bookmarks = this.getBookmarks();

    this._bookmarks = this._bookmarks.filter(bookmark => bookmark.id !== verbID);
    this.bookmarksUpdate.next([...this._bookmarks]);

    localStorage.setItem('Bookmarks', JSON.stringify([...this._bookmarks]));
  }
}
