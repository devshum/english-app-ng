// Core
import { Component, Input } from '@angular/core';

// Interfaces
import { newVerb } from './../../../interfaces/newVerb.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() verbs: newVerb[];

  public start = 0;
  public middle = 5;
  public end = 10;

  constructor() { }

  onSliceValues(event: any) {
    const [start, middle, end] = event;

    this.start = start;
    this.middle = middle;
    this.end = end;
  }
}
