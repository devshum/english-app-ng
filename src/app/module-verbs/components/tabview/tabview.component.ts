import { TabsService } from './../../../services/tabs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabview',
  templateUrl: './tabview.component.html',
  styleUrls: ['./tabview.component.scss']
})
export class TabviewComponent implements OnInit  {
  public activeTab: string;

  constructor(
    private _tabsService: TabsService
  ) { }

  ngOnInit(): void {
    this.activeTab = this._tabsService.getActiveTab();
  }

  public clickSearch() {
    this.activeTab = 'search';
    this._setActiveTab(this.activeTab);
  }

  public clickList() {
    this.activeTab = 'list';
    this._setActiveTab(this.activeTab);
  }

  private _setActiveTab(activeTab: string) {
    this._tabsService.setActiveTab(activeTab);
  }
}
