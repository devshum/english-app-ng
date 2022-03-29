import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { SearchStorageService } from 'src/app/services/searchStorage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() modificator: string;
  @Input() mode: string;

  @Output() verbValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() bookmarkValue: EventEmitter<string> = new EventEmitter<string>();

  public searchVerbValue: string;
  public searchBookmarkValue: string;

  constructor(private _searchStorageService: SearchStorageService) { }

  ngOnInit(): void {
    this.searchVerbValue = this._searchStorageService.getSearchVerbValue();
    this.searchBookmarkValue = this._searchStorageService.getSearchBookmarkValue();
  }

  public inputVerbValue(): void {
    this.verbValue.emit(this.searchVerbValue);
  }

  public inputBookmarkValue(): void {
    this.bookmarkValue.emit(this.searchBookmarkValue);
  }
}
