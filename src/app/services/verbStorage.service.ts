import { newVerb } from './../interfaces/newVerb.interface';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class VerbStorageService {
  public currentVerb: newVerb;

  constructor() {}

  storeVerb(verb: newVerb): void {
    localStorage.setItem('CurrentVerb', JSON.stringify(verb));
  }

  getVerb(): any {
    if(localStorage.getItem('CurrentVerb')) {
      return JSON.parse(localStorage.getItem('CurrentVerb') || '');
    }
  }
}
