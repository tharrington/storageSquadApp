import { Component, OnInit } from '@angular/core';
import { DataService } from '../api/data.service';
import { Router, NavigationExtras } from '@angular/router';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
import * as moment from 'moment';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.page.html',
  styleUrls: ['./dispatch.page.scss'],
})
export class DispatchPage implements OnInit {
  driver: any;
  orders: any;
  dispatch: any;
  testVal: boolean = true;

  constructor(
    public dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('### init!!!');
    this.loadLastDriver();
  }

  async loadLastDriver() {
    const { value } = await Storage.get({ key: 'driver' });
    if(value) {
      this.driver = JSON.parse(value);
    }
  }

  navigateToDrivers() {
    const state = {} ;
    const navigationExtras: NavigationExtras = { state: state };
    this.router.navigate(['/tabs/tabs/dispatch/drivers'], navigationExtras);
  }

  getOrders() {
    const myMoment = moment();
    myMoment.hours(0).minutes(0).seconds(0);
    const myDate = myMoment.toDate();
    this.dataService.doQuery('/dispatches/getDispatchByDriver/' + myDate, 'GET', null).then((orders) => {
      console.log('### got orders: ' + JSON.stringify((orders)));
      this.orders = orders;

    }).catch(err => {
      console.log('### error in orders');
    });
  }

  setOrderStatus(appointment: any) {
    if(appointment.status === 'Scheduled') {
      appointment.status = 'Appointment Scheduled';
    }

    this.dataService.doQuery('/orders/' + appointment._id, 'PUT', appointment).then((orders) => {
      console.log('### got orders: ' + JSON.stringify((orders)));
      this.orders = orders;
      this.getOrders();
    }).catch(err => {
      console.log('### error in orders');
    });
  }


  goToOrder(order: any) {

  }

  startDispatch() {

  }
}
