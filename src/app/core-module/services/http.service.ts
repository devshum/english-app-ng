import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VerbsResponse } from '../interfaces/verbs-response.interface';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private _apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getVerbs(): Observable<VerbsResponse> {
    return this._http.get<VerbsResponse>(`${this._apiUrl}/all`);
  }
}
