// services
import { HttpService } from './../../../core-module/services/http.service';
import { LoaderService } from './../../../core-module/services/loader.service';
import { BookmarksService } from './../../../core-module/services/bookmarks.service';

// common
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

// interfaces
import { newVerb } from './../../../core-module/interfaces/newVerb.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';
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

  private _isPastValid: boolean;
  private _isParticipleValid: boolean;
  private _unsubscribe = new Subject();

  constructor(
    private _formBuilder: FormBuilder,
    private _httpService: HttpService,
    private _loaderService: LoaderService,
    private _bookmarksService: BookmarksService
  ) { }

  get past(): AbstractControl {
    return this.form.get('past') as AbstractControl;
  }

  get pastParticiple(): AbstractControl {
    return this.form.get('pastParticiple') as AbstractControl;
  }

  ngOnInit(): void {
    this.bookmarks = this._bookmarksService.getBookmarks();
    this._bookmarksService.bookmarksUpdate.pipe(
                                            takeUntil(this._unsubscribe)
                                          ).subscribe((bookmarks: newVerb[]) => this.bookmarks = bookmarks);

    this._loaderService.loadingStatus.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });

    this._initForm();
    this.pickVerb();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }

  public isBookmark(verb: newVerb): boolean {
    return this.bookmarks.some(bookmark => JSON.stringify(bookmark) === JSON.stringify(verb));
  }

  public addBookmark(verb: newVerb) {
    this._bookmarksService.addBookmark(verb);
  }

  public deleteBookmark(verbID: string) {
    this._bookmarksService.deleteBookmark(verbID);
  }

  public pickVerb(): void {
    this._loaderService.start();

    if(this.pickBtn) {
      this._httpService.loadRandomVerb();

      this.allowNext = false;
      this._isPastValid = false;
      this._isParticipleValid = false;
      this.form.reset({ past: '', pastParticiple: '' });
      this.pickBtn.nativeElement.blur();
    } else {
      this._httpService.getRandomVerb().subscribe((verb: newVerb) => {
        this.randomVerb = verb;
        this._loaderService.end();
      });
    }
  }

  public hasError(control: AbstractControl, type: string): boolean {
    return control.hasError(type) && control.invalid && (control.dirty || control.touched);
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      past: ['', this._checkPast.bind(this)],
      pastParticiple: ['', this._checkParticiple.bind(this)]
    });
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
    htmlEl.nativeElement.focus();
  }

  private _allowNext(): void {
    this.allowNext = true;
    this._changeFocus(this.pickBtn);
    this.pastInput.nativeElement.blur();
    this.participleInput.nativeElement.blur();
  }
}
