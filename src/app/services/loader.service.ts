import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  private _loading: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  get loadingStatus(): Observable<any> {
    return this._loading.asObservable();
  }

  public start(): void {
    this._loading.next(true);
  }

  public end(): void {
    this._loading.next(false);
  }
}
