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
    localStorage.setItem('SearchValue', JSON.stringify(verbSearch));
  }

  public clearSearch(): void {
    localStorage.removeItem('SearchValue');
    this.searchChanged.next();
  }

}
