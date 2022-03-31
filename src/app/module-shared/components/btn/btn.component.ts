import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})
export class BtnComponent {
  @Input() modificator: string;
  @Input() text: string;
  @Input() focus: boolean;

  constructor() { }
}
