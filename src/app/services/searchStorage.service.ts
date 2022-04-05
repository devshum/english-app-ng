import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchStorageService {
  public searchChanged = new Subject();

  constructor() {}

  public getVerbSearchValue(): string {
    if(localStorage.getItem('SearchValue')) {
      return JSON.parse(localStorage.getItem('SearchValue') || '');
    }

    return '';
  }

  public storeVerbSearchValue(verbSearch: string): void {
    this.setSearch(verbSearch);
  }

  public clearSearch(): void {
    this.setSearch('');
    this.searchChanged.next();
  }

  private setSearch(verbSearchValue: string) {
    localStorage.setItem('SearchValue', JSON.stringify(verbSearchValue));
  }
}
