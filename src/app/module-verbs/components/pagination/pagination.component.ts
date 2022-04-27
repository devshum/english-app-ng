import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { newVerb } from 'src/app/interfaces/newVerb.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() verbs: newVerb[];
  @Output() sliceValues: EventEmitter<[number, number, number]> = new EventEmitter<[number, number, number]>();

  public start = 0;
  public middle = 10;
  public end = 20;
  public currentPage = 1;
  public verbsPerPage = 20;
  public pages: number[];

  constructor() { }

  ngOnInit(): void {
    this.pages = [...Array(this.verbs.length / this.verbsPerPage)].map((_, i) => i + 1);
  }

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
      this.currentPage = this.pages.length;
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
