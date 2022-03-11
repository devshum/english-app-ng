// common
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._initForm();
  }

  onSubmit(): void {
    console.log(this.form);
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      past: ['', Validators.required],
      pastParticiple: ['', Validators.required]
    });
  }
}
