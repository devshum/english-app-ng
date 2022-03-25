import { newVerb } from './../interfaces/newVerb.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class VerbStorageService {
  public currentVerb: newVerb;

  constructor() {}

  storeVerb(verb: newVerb) {
    this.currentVerb = verb;
    localStorage.setItem('CurrentVerb', JSON.stringify(this.currentVerb));
  }

  getVerb() {
    if(localStorage.getItem('CurrentVerb')) {
      return JSON.parse(localStorage.getItem('CurrentVerb') || '');
    }
  }
}
