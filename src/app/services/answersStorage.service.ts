import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { answers } from '../interfaces/answers.interface';

@Injectable({
  providedIn: 'root'
})

export class AnswersStorageService {
  public answers: answers;

  constructor() { }

  public storeAnswers(updatedAnswers: { past: AbstractControl; pastParticiple: AbstractControl }): void {
    this.answers = { past: updatedAnswers.past.value, pastParticiple: updatedAnswers.pastParticiple.value };
    localStorage.setItem('Answers', JSON.stringify(this.answers));
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
