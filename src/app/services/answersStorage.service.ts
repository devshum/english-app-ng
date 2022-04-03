import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { answers } from '../interfaces/answers.interface';

interface updatedAnswers {
  past: AbstractControl;
  pastParticiple: AbstractControl;
}

@Injectable({
  providedIn: 'root'
})

export class AnswersStorageService {
  public _answers: answers;

  constructor() { }

  public storeAnswers(updatedAnswers: updatedAnswers): void {

    const { past, pastParticiple } = updatedAnswers;

    this._answers = { past: past.value, pastParticiple: pastParticiple.value };

    localStorage.setItem('Answers', JSON.stringify(this._answers));
  }

  public getAnswers(): answers {
    if(localStorage.getItem('Answers')) {
      return JSON.parse(localStorage.getItem('Answers') || '');
    }

    return { past: '', pastParticiple: '' };
  }

  public clearAnswers(): void {
    return localStorage.removeItem('Answers');
  }
}
