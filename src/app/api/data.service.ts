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
// import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  token: string;
  driverToken: string;
  user: {};
  driver: any = {};
  private _isTraining = new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router
  ) {
    this.findToken();
  }

  async getDriver() {
    const { value } = await Storage.get({ key: 'driver' });
    if(value) {
      return await JSON.parse(value);
    }
  }
  async getStorage(key: string) {
    const { value } = await Storage.get({ key });
    if(value) {
      return await JSON.parse(value);
    }
  }
  async setIsTraining() {
    const mover = await this.getDriver();
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
  async setToken(token: any, user: any) {
    this.token = token;
    if(!user) {
      const { value } = await Storage.get({ key: 'user' });
      if(value) {
        this.user = JSON.parse(value);
      }
    }
  }

  async setDriverToken(token: any, user: any) {
    this.driverToken = token;
    if(!user) {
      const { value } = await Storage.get({ key: 'driver' });
      if(value) {
        this.driver = JSON.parse(value);
      }
    }
  }

  async findToken() {
    const { value } = await Storage.get({ key: 'token' });
    if(value) {
      this.setToken(JSON.parse(value), null);
    }
  }

  async findDriverToken() {
    const { value } = await Storage.get({ key: 'drivertoken' });
    if(value) {
      this.setToken(JSON.parse(value), null);
    }
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
