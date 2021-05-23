import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/api/data.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { LoaderService } from 'src/app/services/loader.service';
import * as moment from 'moment';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
@Component({
  selector: 'app-unload',
  templateUrl: './unload.page.html',
  styleUrls: ['./unload.page.scss'],
})
export class UnloadPage implements OnInit, OnDestroy {
  unSub: Subscription;
  unloads = [];
  selectedDriver;
  drivers = [];
  constructor(
    private loader: LoaderService,
    private apiService: HttpServiceService,
    public dataService: DataService
  ) { 
    this.fetchData();
  }
  ngOnDestroy(): void {
    if(this.unSub){
      this.unSub.unsubscribe();
    }
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter is working?');
  }
  ngOnInit() {
    this.unSub = this.dataService.driverSub.subscribe((response) => {
      if(response){
        this.selectedDriver = response;
        this.getDrivers();
      }
    });
  }
  getDrivers() {
    this.apiService.get('api/users/driversByRegion').subscribe((response: any) => {
      console.log(response);
      if(response){
        this.drivers = response;
      }
    }, err =>{
      console.log(err);
    });
  }
  fetchData(){
    let myMoment = moment();
    myMoment.hours(0).minutes(0).seconds(0);
    let myDate = new Date(+myMoment);
    const url = 'api/dispatches/getDispatchByDriver/'+myDate;
    this.loader.presentLoading();
    this.apiService.get(url).subscribe((response: any) => {
      console.log(response);
      // if(response) {
      //   this.unloads = response;
      //   if(response.dispatch && response.dispatch.orders) {
      //     $scope.total_orders = 0;
      //     $scope.dispatch.orders.forEach(function(entry) {
      //       var today = moment();
      //       var delDate = moment(entry.deliveryDate).add(3, 'h');
  
      //       // Make sure the order date is the same day as the current date.
      //       if(today.isSame(delDate, 'day')) {
      //         $scope.total_orders++;
      //         if(entry.type == 'Pickup' && entry.status != 'Rescheduled' && entry.status != 'Canceled' && !entry.warehouseLocation) {
      //           $scope.completedOrders.push(entry);
      //         } else if(entry.type == 'Pickup' && entry.status != 'Rescheduled' && entry.status != 'Canceled' && entry.warehouseLocation) {
      //           $scope.warehousedOrders.push(entry);
      //         } 
      //       }
  
      //     });
  
      //     $scope.warehousedOrders = $scope.warehousedOrders.reverse();
      //     $scope.completedOrders = $scope.completedOrders.reverse();
      //   } 
      // }
      this.loader.hideLoading();
    }, err => {
      console.log(err);
      this.loader.hideLoading();
    });
    }
  loginDriver(event){
    const value = this.drivers.find(item => item._id === event.target.value);
    //console.log(value);
    if(value.email){
      this.dataService.loginDriver(value.email, false);
    }
  }
  detail(dispatch){
    console.log(dispatch);
  }

}
