import { Component, Output, EventEmitter, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { newVerb } from 'src/app/interfaces/newVerb.interface';
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
    private _searchStorageService: SearchStorageService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.searchVerb = this._searchStorageService.getVerbSearchValue();
  }

  public inputSearchValue(): void {
    this.searchVerbValue.emit(this.searchVerb);
  }

  public showAllVerbs(): void {
    this._router.navigate(['../all'], { relativeTo: this._activatedRoute });
  }
}
