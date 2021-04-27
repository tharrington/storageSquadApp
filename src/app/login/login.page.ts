import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { DataService } from '../api/data.service';
const { Storage } = Plugins;

import { HTTP } from '@ionic-native/http/ngx';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any = { Email : 'dan@storagesquad.com'};
  errorMessage: string;
  constructor(
    public dataService: DataService,
    private http: HTTP,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  async login() {
    const endpoint = 'https://storage-squad-scheduling.herokuapp.com/auth/local';
    const body = {
      email: this.user.Email,
      password: 'Storage1'
    };

    this.http.post(endpoint, body, {})
      .then(data => {
        this.dataService.setToken(data.data.token, data.data.user);
        console.log(data.status);
        console.log('### data: ' + data.data); // data received by server
        console.log(data.headers);
        const respBody = JSON.parse(data.data);
        console.log('### setting token: ' + JSON.stringify(data.data.token));
        Storage.set({ key : 'token', value : JSON.stringify(respBody.token) });
        Storage.set({ key : 'user', value : JSON.stringify(respBody.user) });
        this.router.navigateByUrl('/tabs/tabs/dispatch');
      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
        if(error && error.error) {
          this.errorMessage = error.error.message;
        }


      });
  }

}
