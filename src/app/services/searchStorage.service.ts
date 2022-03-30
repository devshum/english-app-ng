import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SearchStorageService {
  public searchVerbValue: string;

  constructor() {}

  public storeVerbSearchValue(verbSearch: string): void {
    this.searchVerbValue = verbSearch;
    localStorage.setItem('SearchValue', JSON.stringify(this.searchVerbValue));
  }

  public getVerbSearchValue(): string {
    if(localStorage.getItem('SearchValue')) {
      return JSON.parse(localStorage.getItem('SearchValue') || '');
    }

    return '';
  }
}
