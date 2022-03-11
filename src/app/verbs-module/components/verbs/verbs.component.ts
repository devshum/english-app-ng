// services
import { HttpService } from 'src/app/core-module/services/http.service';

// common
import { Component, OnInit, OnDestroy } from '@angular/core';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// interfaces
import { Verb } from 'src/app/core-module/interfaces/verb.interface';

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss']
})

export class VerbsComponent implements OnInit, OnDestroy {
  public verbs: Verb[];
  private _unsubscribe = new Subject();

  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this._httpService.getVerbs()
                     .pipe(takeUntil(this._unsubscribe))
                     .subscribe(data => this.verbs = data.data);
  }
  ngOnDestroy(): void {
    this._unsubscribe.next();
  }
}
