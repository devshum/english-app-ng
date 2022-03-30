import { Component, Output, EventEmitter, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { newVerb } from 'src/app/interfaces/newVerb.interface';
import { SearchStorageService } from 'src/app/services/searchStorage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  @Input() verbs: newVerb[];

  @Output() searchVerbValue: EventEmitter<string> = new EventEmitter<string>();

  public searchVerb: string;

  public config: PerfectScrollbarConfigInterface = {
    wheelSpeed: 50,
    suppressScrollX: true
  };

  constructor(private _searchStorageService: SearchStorageService) { }

  ngOnInit(): void {
    this.searchVerb = this._searchStorageService.getVerbSearchValue();
  }

  public inputSearchValue(): void {
    this.searchVerbValue.emit(this.searchVerb);
  }
}
