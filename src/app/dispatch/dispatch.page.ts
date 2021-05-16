import { Component, OnInit } from '@angular/core';
import { DataService } from '../api/data.service';
import { Router, NavigationExtras } from '@angular/router';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
import * as moment from 'moment';
import { HttpServiceService } from '../services/http-service.service';

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
  mover;

  constructor(
    public dataService: DataService,
    private router: Router,
    private  apiService: HttpServiceService
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
    this.getOrders();
  }

  navigateToDrivers() {
    const state = {} ;
    const navigationExtras: NavigationExtras = { state: state };
    this.router.navigate(['/tabs/dispatch/drivers'], navigationExtras);
  }

  getOrders() {
    const myMoment = moment();
    myMoment.hours(0).minutes(0).seconds(0);
    const myDate = myMoment.toDate();
    this.apiService.get('api/dispatches/getDispatchByDriver/' + myDate).subscribe((response: any) => {
      console.log(response);
      if(response.dispatch){
        this.orders = response.dispatch.orders ? response.dispatch.orders : [];
        this.dispatch = response.dispatch;
        this.driver = response.dispatch.driver ? response.dispatch.driver : null;
        this.mover = response.dispatch.mover ? response.dispatch.mover : null;
      }
    }, err =>{
      console.log(err);
    });
    // this.dataService.doQuery('/dispatches/getDispatchByDriver/' + myDate, 'GET', null).then((orders) => {
    //   console.log('### got orders: ' + JSON.stringify((orders)));
    //   this.orders = orders;

    // }).catch(err => {
    //   console.log('### error in orders');
    // });
  }

  setOrderStatus(appointment: any) {
    if(appointment.status === 'Scheduled') {
      appointment.status = 'Appointment Scheduled';
    }
    this.apiService.putRequest('api/orders/' + appointment._id,appointment).subscribe((response: any) => {
      console.log(response);
      if(response.data){
        this.orders = response.data;
      }
    }, err => {
      console.log(err);
    });
    // this.dataService.doQuery('/orders/' + appointment._id, 'PUT', appointment).then((orders) => {
    //   console.log('### got orders: ' + JSON.stringify((orders)));
    //   this.orders = orders;
    //   this.getOrders();
    // }).catch(err => {
    //   console.log('### error in orders');
    // });
  }


  goToOrder(order: any) {

  }

  startDispatch() {

  }
}
