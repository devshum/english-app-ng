// Services
import { HttpService } from 'src/app/services/http.service';
import { BookmarksStorageService } from '../../../services/bookmarksStorage.service';
import { LoaderService } from '../../../services/loader.service';
import { ErrorService } from './../../../services/error.service';
import { SearchStorageService } from './../../../services/searchStorage.service';

// Common
import { Component, OnInit, OnDestroy } from '@angular/core';

// Rxjs
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';

// Interfaces
import { newVerb } from 'src/app/interfaces/newVerb.interface';

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss']
})

export class VerbsComponent implements OnInit, OnDestroy {
  public loadingError = false;
  public searchValue: string;
  public verbs: newVerb[];
  public bookmarks: newVerb[] = [];
  public isLoading = false;
  public activeTab = 'search';
  private _unsubscribe = new Subject();

  constructor(
    private _httpService: HttpService,
    private _loaderService: LoaderService,
    private _bookmarksStorageService: BookmarksStorageService,
    private _errorService: ErrorService,
    private _searchStorageService: SearchStorageService
  ) { }

  ngOnInit(): void {
    this._errorService.loadingErrorStatus.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe(loadingError => this.loadingError = loadingError);

    this._bookmarksStorageService.bookmarksUpdate.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe((bookmarks: newVerb[]) => this.bookmarks = bookmarks);

    this._loaderService.loadingStatus.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe((isLoading: boolean) => this.isLoading = isLoading);

    this._loaderService.start();

    this._httpService.getVerbs().pipe(
      takeUntil(this._unsubscribe)
      ).subscribe(newVerbs => {
        this.verbs = newVerbs;
        this.bookmarks = this._bookmarksStorageService.getBookmarks();
        this._getVerbSearch();
        this._loaderService.end();
      }, error => this._errorService.hasError());
  }

  public onSearchVerbValue(searchVerbValue: string): void {
    this._searchStorageService.storeVerbSearchValue(searchVerbValue);
    this._getVerbSearch();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._loaderService.end();
  }

  private _getVerbSearch(): void {
    this.searchValue = this._searchStorageService.getVerbSearchValue();
  }
}
