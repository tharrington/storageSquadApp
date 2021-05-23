import { Injectable } from '@angular/core';
import { Plugins, App } from '@capacitor/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
const {
  Storage,
  Platform
} = Plugins;

import { Observable, throwError, from, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { HttpServiceService } from '../services/http-service.service';
import { Location } from '@angular/common';
// import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private token: string;
  // private driverToken: string;
  // private user: {};
  // private driver: any = {};
  private _isTraining = new BehaviorSubject<boolean>(false);
  private _driver = new BehaviorSubject<any>(null);
  constructor(
    private apiService: HttpServiceService,
    private loader: LoaderService,
    private location: Location
  ) {
    // this.findToken();
  }
  get driverSub() {
    return this._driver.asObservable();
  }
  async initDriver() {
    const driver = await this.getStorage('driver');
    if(driver){
      this._driver.next(driver);
    }
  }
  setDriver(driver) {
    Storage.set({ key : 'driver', value : JSON.stringify(driver) });
    this._driver.next(driver);
  }
  // async getDriver() {
  //   const { value } = await Storage.get({ key: 'driver' });
  //   if(value) {
  //     return await JSON.parse(value);
  //   }
  // }
  async getStorage(key: string) {
    const { value } = await Storage.get({ key });
    if(value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  }
  async setIsTraining() {
    const mover = await this.getStorage('driver');
    if(mover) {
      this._isTraining.next(true);
    } else {
      this._isTraining.next(false);
    }
  }
  get isTraining(): Observable<boolean> {
    return this._isTraining.asObservable();
  }
  get isTrainingValue() {
    return this._isTraining.value;
  }
  // async setToken(token: any, user: any) {
  //   this.token = token;
  //   if(!user) {
  //     const { value } = await Storage.get({ key: 'user' });
  //     if(value) {
  //       this.user = JSON.parse(value);
  //     }
  //   }
  // }

  // async setDriverToken(token: any, user: any) {
  //   this.driverToken = token;
  //   if(!user) {
  //     const { value } = await Storage.get({ key: 'driver' });
  //     if(value) {
  //       this.driver = JSON.parse(value);
  //     }
  //   }
  // }

  // async findToken() {
  //   const { value } = await Storage.get({ key: 'token' });
  //   if(value) {
  //     this.setToken(JSON.parse(value), null);
  //   }
  // }

  // async findDriverToken() {
  //   const { value } = await Storage.get({ key: 'drivertoken' });
  //   if(value) {
  //     this.setToken(JSON.parse(value), null);
  //   }
  // }
  loginDriver(email: string, isBac: boolean) {
    const body = {
      email,
      password: 'Storage1'
    };
    this.loader.presentLoading();
    this.apiService.post('auth/local', body).subscribe((response: any) => {
      console.log(response);
      if(response.token) {
        localStorage.setItem('drivertoken',response.token);
        this.setDriver(response.user);
        this.setIsTraining();
        this.loader.hideLoading();
        if(isBac){
          this.location.back();
        }
      }
    });
  }

  /**
   *
   */
  getBaseURL() {
    return 'https://storage-squad-scheduling.herokuapp.com/api/';
  }
  displayDate (dispatch) {
    return moment(dispatch.dispatchDate).add(1, 'days').format('dddd, MMMM Do');
  };
}
