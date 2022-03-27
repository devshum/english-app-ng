import { Injectable } from '@angular/core';

interface localVerb {
  infinitive: string;
  past: string;
  pastParticiple: string;
}

@Injectable({
  providedIn: 'root'
})

export class VerbStorageService {
  public currentVerb: localVerb;

  constructor() {}

  public storeVerb(verb: localVerb): void {
    this.currentVerb = { infinitive: verb.infinitive, past: verb.past, pastParticiple: verb.pastParticiple };
    localStorage.setItem('CurrentVerb', JSON.stringify(this.currentVerb));
  }

  public getVerb(): any {
    if(localStorage.getItem('CurrentVerb')) {
      return JSON.parse(localStorage.getItem('CurrentVerb') || '');
    }
  }
}
