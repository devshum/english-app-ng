// common
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

// interfaces
import { Verb } from 'src/app/core-module/interfaces/verb.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  @ViewChild('pastInput', { static: false }) pastInput: ElementRef;
  @ViewChild('participleInput', { static: false }) participleInput: ElementRef;
  @ViewChild('pickBtn', { static: false }) pickBtn: ElementRef;
  @Input() randomVerb: Verb;
  public form: FormGroup;
  public allowNext = false;
  private _isPastValid = false;
  private _isParticipleValid = false;
  //test
  private _validPast = 'forgot';
  private _validParticiple = 'forgotten';

  constructor(private _formBuilder: FormBuilder) { }

  get past(): AbstractControl {
    return this.form.get('past') as AbstractControl;
  }

  get pastParticiple(): AbstractControl {
    return this.form.get('pastParticiple') as AbstractControl;
  }

  ngOnInit(): void {
    this._initForm();
  }

  hasError(control: AbstractControl, type: string): boolean {
    return control.hasError(type) && control.invalid && (control.dirty || control.touched);
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      past: ['', [Validators.required, this._checkPast.bind(this)]],
      pastParticiple: ['', [Validators.required, this._checkParticiple.bind(this)]]
    });
  }

  private _checkPast(control: AbstractControl): {[s: string]: boolean} | null {
    const enteredValue = control.value.toLowerCase();

    switch (true) {
      case this._validPast === enteredValue:
        this._changePastInputState();
        break;

      case this._validPast !== enteredValue:
        return { pastIsCorrect: true };
    }

    return null;
  }

  private _checkParticiple(control: AbstractControl): {[s: string]: boolean} | null {
    const enteredValue = control.value.toLowerCase();

    switch (true) {
      case this._validParticiple === enteredValue:
        this._changeParticipleInputFocus();
        break;
      case this._validParticiple !== enteredValue:
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
  }
}
