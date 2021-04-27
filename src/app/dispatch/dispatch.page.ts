import { Component, OnInit } from '@angular/core';
import { DataService } from '../api/data.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.page.html',
  styleUrls: ['./dispatch.page.scss'],
})
export class DispatchPage implements OnInit {
  driver: any;
  constructor(
    public dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  navigateToDrivers() {
    const state = {} ;
    const navigationExtras: NavigationExtras = { state: state };
    this.router.navigate(['/tabs/tabs/dispatch/drivers'], navigationExtras);
  }
}
