// environment
import { environment } from './../../../environments/environment';

// common
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Observable } from 'rxjs';

// interfaces
import { VerbsResponse } from '../interfaces/verbs-response.interface';
import { RandomVerbResponse } from '../interfaces/randomVerbResponse.interface';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private _apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getVerbs(): Observable<VerbsResponse> {
    return this._http.get<VerbsResponse>(`${this._apiUrl}/all`);
  }

  getRandomVerb(): Observable<RandomVerbResponse> {
    return this._http.get<RandomVerbResponse>(`${this._apiUrl}/random`);
  }
}
