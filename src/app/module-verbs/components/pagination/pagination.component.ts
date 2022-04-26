import { Component, Input, Output, EventEmitter } from '@angular/core';
import { newVerb } from 'src/app/interfaces/newVerb.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() verbs: newVerb[];
  @Output() sliceValues: EventEmitter<[number, number, number]> = new EventEmitter<[number, number, number]>();

  public start = 0;
  public middle = 5;
  public end = 10;
  public currentPage = 1;
  public verbsPerPage = 10;
  public pages = [...Array(this.verbsPerPage + this.verbsPerPage)].map((_, i) => i + 1);

  constructor() { }

  navigatePage(...arg: any): void {
    const [direction] = arg;

    if(direction === 'prev') {
      this.currentPage--;
    }

    if(direction === 'next') {
      this.currentPage++;
    }

    if(direction === 'prevStart') {
      this.currentPage = 1;
    }

    if(direction === 'nextEnd') {
      this.currentPage = this.verbsPerPage + this.verbsPerPage;
    }

    this.start = (this.currentPage - 1) * this.verbsPerPage;
    this.end = this.start + this.verbsPerPage;
    this.middle = (this.start + this.end) / 2;

    this.sliceValues.emit([this.start, this.middle, this.end]);
  }

  getPrevAllowed() {
    return this.start > this.currentPage - 1;
  }

  getNextAllowed() {
    return this.end < this.verbs.length;
  }
}
