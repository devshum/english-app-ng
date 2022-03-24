import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  private _loading: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);

  constructor() { }

  get loadingStatus(): Observable<any> {
    return this._loading.asObservable();
  }

  start() {
    this._loading.next(true);
  }

  end() {
    this._loading.next(false);
  }
}
