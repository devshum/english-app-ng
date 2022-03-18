// services
import { HttpService } from 'src/app/core-module/services/http.service';

// common
import { Component, OnInit, OnDestroy } from '@angular/core';

// rxjs
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

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
  private _unsubscribe = new Subject();

  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this._httpService.getVerbs()
                     .pipe(
                       takeUntil(this._unsubscribe),
                       map((verbs: any) => {
                        const newVerbs: newVerb[] = [];

                        verbs.data.map((verb: any) => {
                          newVerbs.push({
                            id: verb._id,
                            infinitive: checkSlash(verb.infinitive),
                            past: checkSlash(verb.past),
                            pastParticiple: checkSlash(verb.pastParticiple)
                          });
                        });

                        return newVerbs;
                      })
                     ).subscribe(newVerbs => this.verbs = newVerbs);
                    }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }
}
