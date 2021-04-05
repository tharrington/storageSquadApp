

import { Injectable } from '@angular/core';
import { Plugins, App } from '@capacitor/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

const {
  Storage,
  Platform
} = Plugins;

import { Observable, throwError, from } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  token : string;

  constructor(
    public nativeHttp : HTTP,
    private router: Router
  )
  {


  }


  async doQuery(endpoint: string, method: string, auth_required: boolean, body: any) {
    // try {
    //   endpoint = this.getBaseURL() + endpoint;
    //   const params = {};
    //   let headers = {
    //     'Access-Control-Allow-Origin' : '*',
    //     'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
    //     'Content-Type' : 'application/json'
    //   };
    //
    //   if(this.token && auth_required) {
    //     headers['Authorization'] = 'Bearer ' + this.token;
    //     headers['x-csrf-token'] = '_csrf';
    //   } else if(!this.token && auth_required) {
    //
    //   }
    //
    //   console.log('### token: ' + JSON.stringify(this.token));
    //
    //   let response;
    //   if(method === 'GET') {
    //     response = await this.nativeHttp.get(endpoint, params, headers);
    //   } else if(method === 'POST') {
    //     this.nativeHttp.setDataSerializer('json');
    //     response = await this.nativeHttp.post(endpoint, body, headers);
    //   } else if(method === 'PUT') {
    //     this.nativeHttp.setDataSerializer('json');
    //     response = await this.nativeHttp.put(endpoint, body, headers);
    //   }
    //
    //   return JSON.parse(response.data);
    // } catch (error) {
    //   console.error('### err status: ' + error.status);
    // }
  }

  setToken(token : any) {
    this.token = token;
  }

  async findToken() {
    const { value } = await Storage.get({ key: 'token' });
    if(value) {
      this.setToken(JSON.parse(value));
    }
  }


  /**
   *
   */
  getBaseURL() {
    return 'https://storage-squad-scheduling.herokuapp.com/';
  }
}
