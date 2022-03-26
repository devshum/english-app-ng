// Services
import { HttpService } from '../../../services/http.service';
import { LoaderService } from '../../../services/loader.service';
import { BookmarksStorageService } from '../../../services/bookmarksStorage.service';
import { AnswersStorageService } from './../../../services/answersStorage.service';
import { VerbStorageService } from './../../../services/verbStorage.service';

// Common
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

// Interfaces
import { newVerb } from '../../../interfaces/newVerb.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit, OnDestroy {
  @ViewChild('pastInput', { static: false }) pastInput: ElementRef;
  @ViewChild('participleInput', { static: false }) participleInput: ElementRef;
  @ViewChild('pickBtn', { static: false }) pickBtn: ElementRef;

  public randomVerb: newVerb;
  public isLoading = false;
  public form: FormGroup;
  public allowNext: boolean;
  public bookmarks: newVerb[] = [];
  public loadingError = false;

  private _answers: { past: string; pastParticiple: string };
  private _isPastValid: boolean;
  private _isParticipleValid: boolean;
  private _unsubscribe = new Subject();

  constructor(
    private _formBuilder: FormBuilder,
    private _httpService: HttpService,
    private _loaderService: LoaderService,
    private _bookmarksStorageService: BookmarksStorageService,
    private _answersStorage: AnswersStorageService,
    private _verbStorage: VerbStorageService
  ) { }

  get past(): AbstractControl {
    return this.form.get('past') as AbstractControl;
  }

  get pastParticiple(): AbstractControl {
    return this.form.get('pastParticiple') as AbstractControl;
  }

  ngOnInit(): void {
    this._answers = this._answersStorage.getAnswers();
    this.bookmarks = this._bookmarksStorageService.getBookmarks();

    this._getLocalVerb();
    this._initForm();

    this._bookmarksStorageService.bookmarksUpdate.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe((bookmarks: newVerb[]) => this.bookmarks = bookmarks);

    this._loaderService.loadingStatus.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });

    if(!this.randomVerb) {
      this._loaderService.start();
      this._getRandomVerb();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }

  public isBookmark(verb: newVerb): boolean {
    return this.bookmarks.some(bookmark => JSON.stringify(bookmark) === JSON.stringify(verb));
  }

  public addBookmark(verb: newVerb) {
    this._bookmarksStorageService.addBookmark(verb);
  }

  public deleteBookmark(verbID: string) {
    this._bookmarksStorageService.deleteBookmark(verbID);
  }

  public pickVerb(): void {
    this._loaderService.start();
    this._getRandomVerb();

    this.allowNext = false;
    this._isPastValid = false;
    this._isParticipleValid = false;
    this.form.reset({ past: '', pastParticiple: '' });
    this._answersStorage.clearAnswers();
    this.pickBtn.nativeElement.blur();
  }

  public hasError(control: AbstractControl, type: string): boolean {
    return control.hasError(type) && control.invalid && (control.dirty || control.touched);
  }

  public onStoreAnswer(answers: { past: AbstractControl; pastParticiple: AbstractControl } ): void {
    this._answersStorage.storeAnswers(answers);
  }

  public reloadCurrentPage() {
    window.location.reload();
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      past: [this._answers?.past ?
             this._answers?.past : '',
             this._checkPast.bind(this)],

      pastParticiple: [this._answers?.pastParticiple ?
                       this._answers?.pastParticiple : '',
                       this._checkParticiple.bind(this)]
    });

    if(this.form.controls.past.value) {
      this.form.controls.past.markAllAsTouched();
    }

    if(this.form.controls.pastParticiple.value) {
      this.form.controls.pastParticiple.markAllAsTouched();
    }
  }

  private _checkPast(control: AbstractControl): {[s: string]: boolean} | null {
    const enteredValue = control.value.toLowerCase();

    switch (true) {
      case this.randomVerb?.past === enteredValue:
        this._changePastInputState();
        break;

      case this.randomVerb?.past !== enteredValue:
        return { pastIsCorrect: true };
    }

    return null;
  }

  private _checkParticiple(control: AbstractControl): {[s: string]: boolean} | null {
    const enteredValue = control.value.toLowerCase();

    switch (true) {
      case this.randomVerb?.pastParticiple === enteredValue:
        this._changeParticipleInputFocus();
        break;
      case this.randomVerb?.pastParticiple !== enteredValue:
        return { participleIsCorrect: true };
    }

    return null;
  }

  private _changeParticipleInputFocus(): void {
    this._isParticipleValid = true;

    switch (true) {
      case !this._isPastValid:
        this._changeFocus(this.pastInput);
        break;

      case this._isParticipleValid && this._isPastValid:
        this._allowNext();
        break;
    }
  }

  private _changePastInputState(): void {
    this._isPastValid = true;

    switch (true) {
      case !this._isParticipleValid:
        this._changeFocus(this.participleInput);
        break;

      case this._isParticipleValid && this._isPastValid:
        this._allowNext();
        break;
    }
  }

  private _changeFocus(htmlEl: ElementRef): void {
   if(htmlEl) {
    htmlEl.nativeElement.focus();
   }
  }

  private _allowNext(): void {
    this.allowNext = true;

    if(this.pastInput) {
      this.pastInput.nativeElement.blur();
    }

    if(this.participleInput) {
      this.participleInput .nativeElement.blur();
    }
  }

  private _getLocalVerb(): void {
    this.randomVerb = this._verbStorage.getVerb();
  }

  private _getRandomVerb(): void {
    this._httpService.getRandomVerb().subscribe((verb: newVerb) => {
      this._verbStorage.storeVerb(verb);
      this._getLocalVerb();
      this._loaderService.end();
    }, error => {
      this.loadingError = true;
    });
  }
}
