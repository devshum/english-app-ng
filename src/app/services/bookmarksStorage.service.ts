import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { newVerb } from '../interfaces/newVerb.interface';

@Injectable({
  providedIn: 'root'
})

export class BookmarksStorageService {
  public bookmarksUpdate: Subject<newVerb[]> = new Subject<newVerb[]>();

  private _isFlashClass: Subject<boolean> = new Subject<boolean>();
  private _bookmarks: newVerb[] = [];

  constructor() { }

  get getFlashClass(): Observable<any> {
    return this._isFlashClass.asObservable();
  }

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
      this.bookmarksUpdate.next([...this._bookmarks]);
    }

    this._setFlashClass();
    localStorage.setItem('Bookmarks', JSON.stringify([...this._bookmarks]));
  }

  public deleteBookmark(verbID: string): void {
    this._bookmarks = this.getBookmarks();

    this._bookmarks = this._bookmarks.filter(bookmark => bookmark.id !== verbID);
    this.bookmarksUpdate.next([...this._bookmarks]);

    this._setFlashClass();

    localStorage.setItem('Bookmarks', JSON.stringify([...this._bookmarks]));

    if(!this._bookmarks.length) {
      localStorage.removeItem('Bookmarks');
    }
  }

  private _setFlashClass(): void {
    this._isFlashClass.next(true);
    setTimeout(() => this._isFlashClass.next(false), 400);
  }
}
