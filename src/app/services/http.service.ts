// Environment
import { environment } from '../../environments/environment';

// Common
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Rxjs
import { Observable, BehaviorSubject, Subject } from 'rxjs';

// Interfaces
import { VerbsResponse } from '../interfaces/verbsResponse.interface';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { newVerb } from '../interfaces/newVerb.interface';
import { checkSlash } from '../functions/checkSlash';
import { Verb } from '../interfaces/verb.interface';
import { RandomVerbResponse } from '../interfaces/randomVerbResponse.interface';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private _verbUpdate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _apiUrl = environment.apiUrl;
  private _newVerbs: Observable<newVerb[]>;
  private _newVerb: Observable<newVerb>;

  constructor(private _http: HttpClient) {
    this._newVerb = this._verbUpdate.pipe(
      switchMap(() => this._http.get<RandomVerbResponse>(`${this._apiUrl}/random`).pipe(
        map((randomVerb: RandomVerbResponse) => {
          const newRandomVerb = {
            id: randomVerb.data._id,
            infinitive: checkSlash(randomVerb.data.infinitive),
            past: checkSlash(randomVerb.data.past),
            pastParticiple: checkSlash(randomVerb.data.pastParticiple)
          };

          return newRandomVerb;
        })
      )),
      shareReplay(1)
    );

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
  }

  getVerbs(): Observable<newVerb[]> {
    return this._newVerbs;
  }

  getRandomVerb(): Observable<newVerb> {
    return this._newVerb;
  }

  loadRandomVerb(): void {
    this._verbUpdate.next(true);
  }
}
