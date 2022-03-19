import { LoaderService } from './../../../core-module/services/loader.service';
// services
import { HttpService } from 'src/app/core-module/services/http.service';

// common
import { Component, OnInit, OnDestroy } from '@angular/core';

// rxjs
import { Subject, timer } from 'rxjs';
import { takeUntil} from 'rxjs/operators';

// interfaces
import { newVerb } from 'src/app/core-module/interfaces/newVerb.interface';

// functions
import { checkSlash } from 'src/app/core-module/functions/checkSlash';

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss']
})

export class VerbsComponent implements OnInit, OnDestroy {
  public verbs: newVerb[];
  public isLoading = false;
  private _unsubscribe = new Subject();

  constructor(
    private _httpService: HttpService,
    private _loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this._loaderService.loadingStatus.pipe(
                                        takeUntil(this._unsubscribe)
                                      ).subscribe((isLoading: boolean) => this.isLoading = isLoading);
    this._loaderService.start();
    this._httpService.getVerbs()
                     .pipe( takeUntil(this._unsubscribe))
                     .subscribe(newVerbs => {
                        this.verbs = newVerbs;
                        this._loaderService.end();
                     });
                    }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }
}
