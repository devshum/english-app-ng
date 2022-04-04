import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  public tabChanged = new Subject();

  constructor() { }

  public setActiveTab(activeTab: string) {
    localStorage.setItem('ActiveTab', JSON.stringify(activeTab));
    this.tabChanged.next();
  }

  public getActiveTab(): string {
    if(localStorage.getItem('ActiveTab')) {
      return JSON.parse(localStorage.getItem('ActiveTab') || '');
    }

    return 'search';
  }
}
