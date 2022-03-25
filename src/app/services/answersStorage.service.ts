import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class AnswersStorageService {
  public answers: { past: string; pastParticiple: string };

  constructor() { }

  public storeAnswers(answers: { past: AbstractControl; pastParticiple: AbstractControl } ) {
    this.answers = { past: answers.past.value, pastParticiple: answers.pastParticiple.value };
    localStorage.setItem('Answers', JSON.stringify(this.answers));
  }

  public getAnswers() {
    if(localStorage.getItem('Answers')) {
      return JSON.parse(localStorage.getItem('Answers') || '');
    }
  }

  public clearAnswers() {
    return localStorage.removeItem('Answers');
  }
}
