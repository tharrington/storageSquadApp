import { Component, OnInit } from '@angular/core';
import {DataService} from '../api/data.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPage implements OnInit {
  drivers: any = [];
  constructor(public dataService: DataService,) { }

  ngOnInit() {
    this.dataService.doQuery('users/driversByRegion', 'GET', null).then((drivers) => {
      console.log('### got drivers: ' + JSON.stringify((drivers)));
      this.drivers = drivers;

    }).catch(err => {
      console.log('### error in drivers');
    });
  }

  selectDriver(driver: any) {
    console.log('### selected driver: ' + JSON.stringify(driver));
  }

}
