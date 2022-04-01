import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tabview',
  templateUrl: './tabview.component.html',
  styleUrls: ['./tabview.component.scss']
})
export class TabviewComponent implements OnInit {
  @Output() tab: EventEmitter<string> = new EventEmitter<string>();

  public activeTab = 'search';

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  public clickSearch() {
    this.activeTab = 'search';
    this.tab.emit(this.activeTab);
  }

  public clickList() {
    this.activeTab = 'list';
    this.tab.emit(this.activeTab);
  }
}
