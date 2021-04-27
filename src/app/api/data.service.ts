

import { Injectable } from '@angular/core';
import { Plugins, App } from '@capacitor/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

const {
  Storage,
  Platform
} = Plugins;

import { Observable, throwError, from } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  token: string;
  user: {};
  driver: any = {};

  constructor(
    private http: HTTP,
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

  async doQuery(endpoint: string, method: string, body: any) {
    try {
      endpoint = this.getBaseURL() + endpoint;
      const params = {};
      const headers = {
        'Content-Type': 'application/json',
        'x-access-token': this.token
      };

      console.log('### token: ' + JSON.stringify(this.token));
      let response;
      if(method === 'GET') {
        response = await this.http.get(endpoint, params, headers);
      } else if(method === 'POST') {
        this.http.setDataSerializer('json');
        response = await this.http.post(endpoint, body, headers);
      } else if(method === 'PUT') {
        this.http.setDataSerializer('json');
        response = await this.http.put(endpoint, body, headers);
      } else if(method === 'DELETE') {
        endpoint = endpoint + '/' + body;
        response = await this.http.delete(endpoint, params, headers);
      }
      return JSON.parse(response.data);
      // let response;
      // if(method === 'GET') {
      //
      //   await this.http.get(endpoint, body, headers)
      //     .then(data => {
      //       console.log('### data: ' + JSON.stringify(data));
      //       response = data.data;
      //     })
      //     .catch(error => {
      //
      //       console.log(error.status);
      //       console.log(error.error); // error message as string
      //       console.log(error.headers);
      //     });
      //   // response = await this.nativeHttp.get(endpoint, params, headers);
      // } else if(method === 'POST') {
      //   // this.nativeHttp.setDataSerializer('json');
      //   // response = await this.nativeHttp.post(endpoint, body, headers);
      //
      //   this.http.post(endpoint, body, headers)
      //     .then(data => {
      //       response = data.data;
      //     })
      //     .catch(error => {
      //
      //       console.log(error.status);
      //       console.log(error.error); // error message as string
      //       console.log(error.headers);
      //     });
      // } else if(method === 'PUT') {
      //   // this.nativeHttp.setDataSerializer('json');
      //   // response = await this.nativeHttp.put(endpoint, body, headers);
      // }
      //
      // return JSON.parse(response.data);
    } catch (error) {
      console.error('### err status: ' + JSON.stringify(error));
    }
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

  async findToken() {
    const { value } = await Storage.get({ key: 'token' });
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
}
