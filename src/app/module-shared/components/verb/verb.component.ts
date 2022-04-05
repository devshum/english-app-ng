import { Component, Input } from '@angular/core';
import { newVerb } from 'src/app/interfaces/newVerb.interface';

@Component({
  selector: 'app-verb',
  templateUrl: './verb.component.html',
  styleUrls: ['./verb.component.scss']
})

export class VerbComponent {
  @Input() verb: newVerb;
  @Input() modificator: string;

  constructor() { }
}
