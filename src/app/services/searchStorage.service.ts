import { newVerb } from './../interfaces/newVerb.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchStorageService {
  public searchChanged = new Subject();
  public verbStatus = new Subject();
  public openedVerb: newVerb;

  constructor() {}

  public getVerbSearchValue(): any {
    return this._getLocal('SearchValue');
  }

  public getOpenedVerb(): any {
    return this._getLocal('OpenedVerb');
  }

  public storeVerbSearchValue(verbSearch: string): void {
    this._storeLocal(verbSearch, 'SearchValue');
  }

  public storeOpenedVerb(verb: newVerb): void {
    this._storeLocal(verb, 'OpenedVerb');
    this.verbStatus.next();
  }

  public clearSearch(): void {
    localStorage.removeItem('SearchValue');
    this.searchChanged.next();
  }

  public clearAll() {
    localStorage.removeItem('SearchValue');
    localStorage.removeItem('OpenedVerb');
    this.searchChanged.next();
    this.verbStatus.next();
  }

  private _getLocal(description: string): void {
    if(localStorage.getItem(description)) {
      return JSON.parse(localStorage.getItem(description) || '');
    }
  }

  private _storeLocal(data: any, description: string): void {
    localStorage.setItem(description, JSON.stringify(data));
  }
}
