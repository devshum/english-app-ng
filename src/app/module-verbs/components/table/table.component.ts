// Core
import { Component, Input, OnInit } from '@angular/core';

// Interfaces
import { newVerb } from './../../../interfaces/newVerb.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() verbs: newVerb[];

  constructor() { }

  ngOnInit(): void {
  }

}
