import { HttpService } from './../../../core-module/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _httpService: HttpService) { }

  ngOnInit(): void {
    this._httpService.getVerbs().subscribe(data => console.log(data.data));
  }
}
