import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SearchStorageService {
  private _searchVerbValue: string;

  constructor() {}

  public storeVerbSearchValue(verbSearch: string): void {
    this._searchVerbValue = verbSearch;
    localStorage.setItem('SearchValue', JSON.stringify(this._searchVerbValue));
  }

  public getVerbSearchValue(): string {
    if(localStorage.getItem('SearchValue')) {
      return JSON.parse(localStorage.getItem('SearchValue') || '');
    }

    return '';
  }
}
