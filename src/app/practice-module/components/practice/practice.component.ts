// services
import { HttpService } from './../../../core-module/services/http.service';

// common
import { Component, OnDestroy, OnInit } from '@angular/core';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// interfaces
import { Verb } from 'src/app/core-module/interfaces/verb.interface';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})

export class PracticeComponent implements OnInit, OnDestroy {
  public randomVerb: Verb;
  private _unsubscribe = new Subject();

  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this._httpService.getRandomVerb()
                     .pipe(takeUntil(this._unsubscribe))
                     .subscribe(data => {
                        this.randomVerb = data.data;
                        console.log(this.randomVerb);
                     });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }
}