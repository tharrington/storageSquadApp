import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title = '';
  @Input() isBack = false;
  constructor(
    private location: Location
  ) { }

  ngOnInit() {}
  goBack(){
    this.location.back();
  }
}
