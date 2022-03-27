// Services
import { HttpService } from 'src/app/services/http.service';
import { BookmarksStorageService } from '../../../services/bookmarksStorage.service';
import { LoaderService } from '../../../services/loader.service';

// Common
import { Component, OnInit, OnDestroy } from '@angular/core';

// Rxjs
import { Subject, timer } from 'rxjs';
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
  private _unsubscribe = new Subject();

  constructor(
    private _httpService: HttpService,
    private _loaderService: LoaderService,
    private _bookmarksStorageService: BookmarksStorageService
  ) { }

  ngOnInit(): void {
    this.bookmarks = this._bookmarksStorageService.getBookmarks();
    this._bookmarksStorageService.bookmarksUpdate.pipe(
        takeUntil(this._unsubscribe)
    ).subscribe((bookmarks: newVerb[]) => this.bookmarks = bookmarks);

    this._loaderService.loadingStatus.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe((isLoading: boolean) => this.isLoading = isLoading);
    this._loaderService.start();

    this._httpService.getVerbs()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(newVerbs => {
        this.verbs = newVerbs;
        this._loaderService.end();
      }, error => {
        this.loadingError = error;
      });
  }

  public isBookmark(verb: newVerb): boolean {
    return this.bookmarks.some(bookmark => JSON.stringify(bookmark) === JSON.stringify(verb));
  }

  public addBookmark(verb: newVerb) {
    this._bookmarksStorageService.addBookmark(verb);
  }

  public deleteBookmark(verbID: string) {
    this._bookmarksStorageService.deleteBookmark(verbID);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._loaderService.end();
  }
}
