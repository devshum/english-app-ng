// Core
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

// 3rd package library
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Interfaces
import { newVerb } from 'src/app/interfaces/newVerb.interface';

// Services
import { SearchStorageService } from 'src/app/services/searchStorage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() verbs: newVerb[];

  @Output() searchVerbValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() chosenVerb: EventEmitter<newVerb> = new EventEmitter<newVerb>();

  public searchVerb: string;
  public config: PerfectScrollbarConfigInterface = {
    wheelSpeed: 50,
    suppressScrollX: true
  };

  private _unsubscribe = new Subject();

  constructor(private _searchStorageService: SearchStorageService) { }

  ngOnInit(): void {
    this._getVerbSearch();

    this._searchStorageService.searchChanged.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe(() =>  this._getVerbSearch());
  }

  public inputSearchValue(): void {
    this.searchVerbValue.emit(this.searchVerb);
  }

  public openVerb(verb: newVerb) {
    this.chosenVerb.emit(verb);
    this._searchStorageService.clearSearch();
  }

  private _getVerbSearch(): void {
    this.searchVerb = this._searchStorageService.getVerbSearchValue();
  }
}
