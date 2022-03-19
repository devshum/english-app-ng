// environment
import { environment } from './../../../environments/environment';

// common
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Observable, BehaviorSubject, Subject } from 'rxjs';

// interfaces
import { VerbsResponse } from '../interfaces/verbs-response.interface';
import { map, shareReplay } from 'rxjs/operators';
import { newVerb } from '../interfaces/newVerb.interface';
import { checkSlash } from '../functions/checkSlash';
import { Verb } from '../interfaces/verb.interface';
import { RandomVerbResponse } from '../interfaces/randomVerbResponse.interface';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private _apiUrl = environment.apiUrl;
  private _newVerbs: Observable<newVerb[]>;
  private _newVerb: Observable<newVerb>;

  constructor(private _http: HttpClient) {
    this._newVerbs = this._http.get<VerbsResponse>(`${this._apiUrl}/all`).pipe(
      map((verbs: VerbsResponse) => {
       const newVerbs: newVerb[] = [];

       verbs.data.map((verb: Verb) => {
         newVerbs.push({
           id: verb._id,
           infinitive: checkSlash(verb.infinitive),
           past: checkSlash(verb.past),
           pastParticiple: checkSlash(verb.pastParticiple)
         });
       });

       return newVerbs;
     }), shareReplay(1)
    );

    this._newVerb = this._http.get<RandomVerbResponse>(`${this._apiUrl}/random`).pipe(
      map((randomVerb: RandomVerbResponse) => {
         const newRandomVerb = {
           id: randomVerb.data._id,
           infinitive: checkSlash(randomVerb.data.infinitive),
           past: checkSlash(randomVerb.data.past),
           pastParticiple: checkSlash(randomVerb.data.pastParticiple)
         };

         return newRandomVerb;
       }), shareReplay(1)
     );
  }

  getVerbs(): Observable<newVerb[]> {
    return this._newVerbs;
  }

  loadRandomVerb() {

  }

  getRandomVerb(): Observable<newVerb> {
    return this._newVerb;
  }
}
