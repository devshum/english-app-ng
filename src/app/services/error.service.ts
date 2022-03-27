import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _loadingError: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  get loadingErrorStatus(): Observable<any> {
    return this._loadingError.asObservable();
  }

  public hasError(): void {
    this._loadingError.next(true);
  }

  public hasNoError(): void {
    this._loadingError.next(false);
  }
}
