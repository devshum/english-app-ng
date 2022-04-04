import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  private _tabChanged = new Subject();

  constructor() { }

  get tabChanged(): Observable<any> {
    return this._tabChanged.asObservable();
  }

  public setActiveTab(activeTab: string) {
    localStorage.setItem('ActiveTab', JSON.stringify(activeTab));
    this._tabChanged.next();
  }

  public getActiveTab(): string {
    if(localStorage.getItem('ActiveTab')) {
      return JSON.parse(localStorage.getItem('ActiveTab') || '');
    }

    return 'search';
  }
}
