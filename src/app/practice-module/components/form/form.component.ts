import { LoaderService } from './../../../core-module/services/loader.service';
// service
import { HttpService } from './../../../core-module/services/http.service';

// common
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

// interfaces
import { Verb } from 'src/app/core-module/interfaces/verb.interface';
import { debounce, takeUntil } from 'rxjs/operators';
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

  public randomVerb: Verb;
  public isLoading = false;
  public form: FormGroup;
  public allowNext: boolean;

  private _isPastValid: boolean;
  private _isParticipleValid: boolean;
  private _unsubscribe = new Subject();

  constructor(
    private _formBuilder: FormBuilder,
    private _httpService: HttpService,
    private _loaderService: LoaderService
  ) { }

  get past(): AbstractControl {
    return this.form.get('past') as AbstractControl;
  }

  get pastParticiple(): AbstractControl {
    return this.form.get('pastParticiple') as AbstractControl;
  }

  ngOnInit(): void {
    this._loaderService.loadingStatus.pipe(
                                      takeUntil(this._unsubscribe),
                                      debounce(load => load ? timer(0) : timer(1000))
                                     )
                                     .subscribe((isLoading: boolean) => this.isLoading = isLoading);

    this._initForm();
    this.pickVerb();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }

  public pickVerb(): void {
    this._loaderService.start();
    this._httpService.getRandomVerb()
                     .pipe(takeUntil(this._unsubscribe))
                     .subscribe(data => {
                        this.randomVerb = data.data;
                        this._loaderService.end();
                     });

    if(this.pickBtn) {
      this.allowNext = false;
      this._isPastValid = false;
      this._isParticipleValid = false;
      this.form.reset({ past: '', pastParticiple: '' });

      this.pickBtn.nativeElement.blur();
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
