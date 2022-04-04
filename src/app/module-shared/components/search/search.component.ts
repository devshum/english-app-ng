// Core
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

// 3rd package library
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

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

  public searchVerb: string;

  public config: PerfectScrollbarConfigInterface = {
    wheelSpeed: 50,
    suppressScrollX: true
  };

  constructor(
    private _searchStorageService: SearchStorageService
    ) { }

  ngOnInit(): void {
    this.searchVerb = this._searchStorageService.getVerbSearchValue();
  }

  public inputSearchValue(): void {
    this.searchVerbValue.emit(this.searchVerb);
  }
}
