import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { DataService } from '../api/data.service';
const { Storage } = Plugins;

const { Http } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user : any = {};
  constructor(public dataService : DataService) {

  }

  ngOnInit() {
  }

  async login() {
    let endpoint = 'https://storage-squad-scheduling.herokuapp.com/auth/local';

    const ret = await Http.request({
      method: 'POST',
      url: endpoint,
      headers: {},
      data: {
        email: this.user.email,
        password: 'Storage12345'
      }
    }).then(data => {
      console.log('### got data: ' + JSON.stringify(data));
    });
  }

}
