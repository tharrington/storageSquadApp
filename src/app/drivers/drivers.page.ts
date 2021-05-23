import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../api/data.service';
import { Plugins } from '@capacitor/core';
import {NavigationExtras, Router} from '@angular/router';
// import {HTTP} from '@ionic-native/http/ngx';
import { HttpServiceService } from '../services/http-service.service';
import { Location } from '@angular/common';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';

const { Storage } = Plugins;

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPage implements OnInit, OnDestroy {
  drivers = [];
  selectedDriver;
  isLoading = true;
  unSub: Subscription;
  constructor(
    public dataService: DataService, 
    private router: Router, 
    private apiService: HttpServiceService,
    private location: Location,
    private loader: LoaderService) {
     }
  ngOnDestroy(): void {
    if(this.unSub){
      this.unSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.driver();
    this.apiService.get('api/users/driversByRegion',true).subscribe((response: any) => {
      //console.log(response);
      if(response){
        this.drivers = response;
      }
      this.isLoading = false;
    },err => {
      console.log(err);
      this.isLoading = false;
    });
  }
  async driver() {
    this.unSub = this.dataService.driverSub.subscribe(response => {
      if(response){
        this.selectedDriver = response;
      }
    })
  }
  selectDriver(driver: any) {
    this.login(driver);
  }
  async login(driver: any) {
    // const body = {
    //   email: driver.email,
    //   password: 'Storage1'
    // };
    this.dataService.loginDriver(driver.email, true);
    // this.loader.presentLoading();
    // this.apiService.post('auth/local', body).subscribe((response: any) => {
    //   console.log(response);
    //   if(response.token) {
    //     localStorage.setItem('drivertoken',response.token);
    //     this.dataService.setToken(response.token, response.user);
    //     // Storage.set({ key : 'drivertoken', value : JSON.stringify(response.token) });
    //     Storage.set({ key : 'driver', value : JSON.stringify(response.user) });
    //     this.dataService.setIsTraining();
    //     this.loader.hideLoading();
    //     this.location.back();
    //   }
    // }, err => {
    //   this.loader.hideLoading();
    //   console.log(err); 
    // });
  }

}
