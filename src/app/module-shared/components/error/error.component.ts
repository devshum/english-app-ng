import { ErrorService } from './../../../services/error.service';
import { LoaderService } from './../../../services/loader.service';
import { VerbStorageService } from './../../../services/verbStorage.service';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { newVerb } from 'src/app/interfaces/newVerb.interface';
import { HttpService } from 'src/app/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {
  @Output() hookVerbsAfterError: EventEmitter<newVerb[]> = new EventEmitter<newVerb[]>();
  @Output() hookRandomVerbAfterError: EventEmitter<newVerb> = new EventEmitter<newVerb>();

  @Input() mode: string;

  public loadingError = false;
  private _unsubscribe = new Subject();

  constructor(
    private _httpService: HttpService,
    private _verbStorage: VerbStorageService,
    private _loaderService: LoaderService,
    private _errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this._errorService.loadingErrorStatus.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe(loadingError => this.loadingError = loadingError);
  }

  public updateDataAfterError(): void {
    switch (true) {
      case this.mode === 'randomVerb':
        this._errorService.hasNoError();

        this._httpService.getRandomVerb().subscribe((verb: newVerb) => {
          this._verbStorage.storeVerb(verb);
          this.hookRandomVerbAfterError.emit(this._verbStorage.getVerb());
          this._loaderService.end();
        }, error => {
          this._errorService.hasError();
        });
        break;

      case this.mode === 'verbs':
        this._errorService.hasNoError();

        this._httpService.getVerbs().subscribe((verbs: newVerb[]) => {
          this.hookVerbsAfterError.emit(verbs);
          this._loaderService.end();
        }, error => {
          this._errorService.hasError();
        });
        break;
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }
}
