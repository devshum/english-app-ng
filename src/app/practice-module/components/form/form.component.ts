// common
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

// interfaces
import { Verb } from 'src/app/core-module/interfaces/verb.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() randomVerb: Verb;
  public form: FormGroup;
  //test
  private validPast = 'forgot';
  private validParticiple = 'forgotten';

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

  onSubmit(): void {
    console.log(this.form);
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

    if(this.validPast !== enteredValue) {
      return { pastIsCorrect: true };
    }

    return null;
  }

  private _checkParticiple(control: AbstractControl): {[s: string]: boolean} | null {
    const enteredValue = control.value.toLowerCase();

    if(this.validParticiple !== enteredValue) {
      return { participleIsCorrect: true };
    }

    return null;
  }
}
