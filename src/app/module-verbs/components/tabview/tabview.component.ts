import { TabsService } from './../../../services/tabs.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tabview',
  templateUrl: './tabview.component.html',
  styleUrls: ['./tabview.component.scss']
})
export class TabviewComponent implements OnInit  {
  public activeTab: string;

  private _unsubscribe = new Subject();

  constructor(
    private _tabsService: TabsService
  ) { }

  ngOnInit(): void {
    if(!this.activeTab) {
      this._tabsService.setActiveTab('search');
    }

    this._tabsService.tabStatus.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe(activeTab => {
      this.activeTab = activeTab;
    });
  }

  public clickSearch() {
    this._tabsService.setActiveTab('search');
  }

  public clickList() {
    this._tabsService.setActiveTab('list');
  }
}
