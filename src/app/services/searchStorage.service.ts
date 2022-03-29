import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SearchStorageService {
  public searchVerbValue: string;
  public searchBookmarkValue: string;

  constructor() {}

  public storeVerbSearch(verbSearch: string): void {
    this._storeLocal(this.searchVerbValue, verbSearch, 'VerbSearch');
  }

  public getSearchVerbValue(): string {
    return this._getLocal('VerbSearch');
  }

  public storeBookmarkSearch(bookmarkSearch: string): void {
    this._storeLocal(this.searchBookmarkValue, bookmarkSearch, 'BookmarkSearch');
  }

  public getSearchBookmarkValue(): string {
    return this._getLocal('BookmarkSearch');
  }

  private _storeLocal(initialSeachValue: string, searchValue: string, localKey: string): void  {
    initialSeachValue = searchValue;
    localStorage.setItem(localKey, JSON.stringify(initialSeachValue));
  }

  private _getLocal(localKey: string): string  {
    if(localStorage.getItem(localKey)) {
      return JSON.parse(localStorage.getItem(localKey) || '');
    }

    return '';
  }
}
