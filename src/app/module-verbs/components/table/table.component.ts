// Core
import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';

// Interfaces
import { newVerb } from './../../../interfaces/newVerb.interface';

// Services
import { PaginationService } from './../../../services/pagination.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() verbs: newVerb[];

  public rowsValue = 1;

  public start = 0;
  public middle = 10;
  public end = 20;
  public currentPage = 1;
  public verbsPerPage = 20;

  constructor(private _paginationService: PaginationService) { }

  ngOnInit(): void {
    this.currentPage = this._paginationService.getPage() || this.currentPage;
    this._calcSlice();
  }

  navigatePage(event: any): void {
    this.currentPage = event.page + 1;
    this._paginationService.storePage(this.currentPage);
    this._calcSlice();
  }

  private _calcSlice() {
    this.start = (this.currentPage - 1) * this.verbsPerPage;
    this.end = this.start + this.verbsPerPage;
    this.middle = (this.start + this.end) / 2;
  }
}
