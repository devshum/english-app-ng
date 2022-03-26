import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  get loadingStatus(): Observable<any> {
    return this._loading.asObservable();
  }

  public start() {
    this._loading.next(true);
  }

  public end() {
    this._loading.next(false);
  }
}
