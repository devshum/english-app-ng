import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  public storePage(page: number): void {
    localStorage.setItem('Page', JSON.stringify(page));
  }

  public getPage() {
    if(localStorage.getItem('Page')) {
      return JSON.parse(localStorage.getItem('Page') || '');
    }
  }
}
