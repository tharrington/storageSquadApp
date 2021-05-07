import { Component, OnInit } from '@angular/core';
import { DataService } from '../api/data.service';
import { Plugins } from '@capacitor/core';
import {NavigationExtras, Router} from '@angular/router';
// import {HTTP} from '@ionic-native/http/ngx';
import { HttpServiceService } from '../services/http-service.service';

const { Storage } = Plugins;

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPage implements OnInit {
  drivers: any = [];
  constructor(
    public dataService: DataService, 
    private router: Router, 
    // private http: HTTP,
    private apiService: HttpServiceService) { }

  ngOnInit() {
    this.apiService.get('api/users/driversByRegion').subscribe((response: any) => {
      console.log(response);
      if(response.data){
        this.drivers = response.data;
      }
    },err => {
      console.log(err);
    });
    // this.dataService.doQuery('users/driversByRegion', 'GET', null).then((drivers) => {
    //   this.drivers = drivers;
    // }).catch(err => {
    // });
  }

  selectDriver(driver: any) {
    Storage.set({ key : 'driver', value : JSON.stringify(driver) });
    // this.login(driver);
  }


  // async login(driver: any) {
  //   const endpoint = 'https://storage-squad-scheduling.herokuapp.com/auth/local';
  //   console.log('### driver: ' + JSON.stringify(driver));
  //   const body = {
  //     email: driver.Email,
  //     password: 'Storage1'
  //   };

  //   this.http.post(endpoint, body, {})
  //     .then(data => {
  //       this.dataService.setDriverToken(data.data.token, data.data.user);
  //       console.log(data.status);
  //       console.log('### driver data: ' + data.data); // data received by server
  //       console.log(data.headers);
  //       const respBody = JSON.parse(data.data);
  //       console.log('### setting token: ' + JSON.stringify(data.data.token));
  //       Storage.set({ key : 'drivertoken', value : JSON.stringify(respBody.token) });
  //       Storage.set({ key : 'driver', value : JSON.stringify(respBody.user) });
  //       this.router.navigateByUrl('/tabs/tabs/dispatch');
  //     })
  //     .catch(error => {
  //       console.log(error.status);
  //       console.log(error.error); // error message as string
  //       console.log(error.headers);
  //     });
  // }

}
