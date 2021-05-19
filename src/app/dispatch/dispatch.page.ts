import { Component, OnInit } from '@angular/core';
import { DataService } from '../api/data.service';
import { Router, NavigationExtras } from '@angular/router';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
import * as moment from 'moment';
import { HttpServiceService } from '../services/http-service.service';
import { ShowTextComponent } from '../components/show-text/show-text.component';
import { ModalController } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';

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
  pickupCount = 0;
  dispatchUpdates = [];
  deliveryCount = 0;
  constructor(
    public dataService: DataService,
    private router: Router,
    private  apiService: HttpServiceService,
    private modalController: ModalController,
    private loader: LoaderService
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
    const response = {"_id":"606f289553f51c00106b175b","driver":{"_id":"59135569c9ebd90b00fde078","updatedAt":"2017-05-10T18:01:13.480Z","provider":"local","email":"bostontruck10@storagesquad.com","hashedPassword":"lMDn08MAp/1hZlIGIj2XfZUNrLLWx9nKLYtzGAdGowkWk1pKZSktT/ZyfOV1QEBfKc54mYII+6i9tMZv+Dru2A==","salt":"mhElNj9PVLUa0wvJ5gN4tQ==","name":"Boston Truck 10","nickname":"BT10","startLocation":{"latitude":42.130056,"longitude":-71.05743869999998,"address":"1 Kiddie Dr"},"__v":0,"confirmedEmail":false,"tutorialCompleted":false,"region":"Boston","locationCodes":[],"payrate":15,"isPaypal":false,"deviceTokens":[],"loadCapacity":1000,"status":"Off","role":"Driver"},"dispatchDate":"2021-05-19T03:05:21.194Z","isFinalized":true,"loadCapacity":1000,"currentLoadSize":0,"mover":{"_id":"570fb93ec24c630e00851121","updatedAt":"2020-10-21T17:10:32.358Z","provider":"local","email":"dan@storagesquad.com","hashedPassword":"QzAeOcD/DnOYz4138u8enahrj+2hKkoMelU25h8V6z4EZqapT8iRI4A5CDRNedtWNoUEdafRap1tVy7oxiXfrQ==","salt":"6WF9efE+GypxpbuX0y7wMA==","name":"Dan Hagberg","__v":0,"phone":"(630) 399-0793","position":{"coords":{"speed":-1,"longitude":-83.38030264044271,"floor":null,"latitude":33.958481228406875,"accuracy":65,"altitude_accuracy":10,"altitude":219.5,"heading":-1},"is_moving":false,"odometer":11569003.3,"uuid":"B67BE219-DDC4-4121-84B2-1F0AE1D23274","activity":{"type":"unknown","confidence":100},"battery":{"level":0.7599999904632568,"is_charging":false},"timestamp":"2020-10-21T17:10:31.974Z"},"twsEmployeeId":"219","tutorialCompletedAt":"2020-03-11T23:00:29.818Z","confirmedEmail":false,"tutorialCompleted":true,"region":"all","locationCodes":[],"payrate":15,"isPaypal":false,"deviceTokens":[],"loadCapacity":1000,"status":"Off","role":"Business"},"status":"On Time","warehouseStatus":"Unloaded","orders":[{"_id":"5f0c616f73107d1a00c224c6","truckOrder":0,"driverName":"","deliveryTime":"","customer":"564c90206e85d90300e9a20b","name":"Dan Hagberg","ssOrderId":"a064M00000V4teeQAB","ssOrderName":"SS-ORDER-00103902","externalId":"a024M00000YLia2QAD","deliveryDate":"2021-05-19T06:00:00.000Z","address":"123 Test","email":"danhagberg2@gmail.com","editURL":"https://www.tfaforms.com/450406?id=a064M00000V4teeQAB&signature=d0I6%2BtWKAaqBsztDe9IDw7Vq0I4Cav%2B5Ax9oe1dAHeA%3D","school":"Babson","phone":"(630) 399-0793","guartanteedPickup":true,"pickupSeason":"Spring 2020","serviceType":"Main Entrance - Meet us Outside Your Building (FREE)","building":"98 Hemenway St","warehouseLocation":"Gg2","warehouse_notes":"Gg notes","guartanteedTime":"123","hasInsurace":false,"shipping":true,"customerId":"10049","Shipping_All_or_Some":"All","shippingDate":"2019-06-01T00:00:00.000Z","shippingAddressName":"Dan Hagberg","shippingAddressStreet1":"42w162 Timber Trl","shippingAddressCity":"Saint Charles","shippingAddressState":"IL","shippingAddressZip":"60175","storingMattress":false,"storingFurniture":false,"tenPlusItems":false,"region":"Boston","account":"56cdd2df75be500e00779d2b","locationCode":103,"position":{"coords":{"latitude":42.343565,"longitude":-71.089964}},"__v":0,"dispatch":"606f289553f51c00106b175b","updatedAt":"2021-05-18T19:31:18.979Z","godModeTrackingLink":"https://storage-squad-scheduling.herokuapp.com/app/view-order/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVmMGM2MTZmNzMxMDdkMWEwMGMyMjRjNiIsImlhdCI6MTYyMTM2NTcyMzc1OH0.ftpdf7P4rC0_Rvet-LrOyMlR4cTHaD3J2KWqPu2L2V4?isGodMode=true","trackingLink":"https://storage-squad-scheduling.herokuapp.com/app/view-order/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVmMGM2MTZmNzMxMDdkMWEwMGMyMjRjNiIsImlhdCI6MTYyMTM2NTcyMzc1OH0.ftpdf7P4rC0_Rvet-LrOyMlR4cTHaD3J2KWqPu2L2V4","driver":"59135569c9ebd90b00fde078","moverPhone":"(630) 399-0793","proxyPhone":"(224) 374-1862","shippingParcels":[],"messages":[],"supplies_delivered":false,"moving_blanket_count":0,"mattress_bag_count":0,"megabox_count":0,"hook_enabled":true,"needs_sync":true,"insuranceUnits":0,"type":"Pickup","loadSize":4,"unpaidInvoices":true,"trunkShippingUnits":0,"luggageShippingUnits":0,"bagShippingUnits":0,"boxShippingUnits":0,"binShippingUnits":0,"megaboxShippingUnits":0,"shippingUnits":0,"deliveryImage":[],"damagedImageURLs":[],"warehouseStatus":"Loaded","status":"Scheduled","createdAt":"1594646895144"}]}
    this.dispatch.orders.forEach( (entry) => {
      if(entry.type == 'Pickup') {
        this.pickupCount++;
      } else {
        this.deliveryCount++;
      } 
    });
    console.log(response);
    return;
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
        this.dispatch.orders.forEach( (entry) => {
          if(entry.type == 'Pickup') {
            this.pickupCount++;
          } else {
            this.deliveryCount++;
          } 
        });
      }
    }, err =>{
      console.log(err);
    });
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
  }


  goToOrder(order: any) {

  }

  async startDispatch() {
    const modal = await this.modalController.create({
      component: ShowTextComponent,
      cssClass: 'show-text-modal',
      animated: true,
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if(result.data){
      this.dispatch.status = 'Start';
      // if(this.dataService.isTrainingValue) {
      //   this.dispatch.status = 'On Time';
      //   this.checkStatus();
      // } else {
      //   this.setDispatchStatus();
      // }      
      this.setDispatchStatus();
    }
  }
  checkStatus() {
  	if(this.dispatch && this.dispatch.status == 'New') {
  		this.dispatchUpdates = [
  				{ status : 'New' },
			  	{ status : 'Start' }
			  ];
		} else {
			if(this.dispatch && this.dispatch.orders) {
	  		this.dispatchUpdates = [
			  	{ status : 'over an hour ahead' },
			  	{ status : '45 minutes ahead' },
			  	{ status : '30 minutes ahead' },
			  	{ status : '15 minutes ahead' },
			  	{ status : 'On Time' },
			  	{ status : '15 minutes behind' },
			  	{ status : '30 minutes behind' },
			  	{ status : '45 minutes behind' },
			  	{ status : 'over an hour behind' }
			  ];
  		}
		}
  }
  setDispatchStatus () {
    this.loader.presentLoading();
    this.apiService.putRequest(`api/dispatches/${this.dispatch._id}`, this.dispatch).subscribe((response) => {
      if(this.dispatch.status == 'Start') {
        this.dispatch.status = 'On Time';
      }
      this.loader.hideLoading();
    }, err => {
      this.loader.hideLoading();
      console.log(err);
    });
	  this.checkStatus();
  }
}
