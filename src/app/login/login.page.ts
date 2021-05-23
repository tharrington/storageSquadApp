import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { DataService } from '../api/data.service';
const { Storage } = Plugins;

// import { HTTP } from '@ionic-native/http/ngx';
import {Router} from '@angular/router';
import { HttpServiceService } from '../services/http-service.service';

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
    // private http: HTTP,
    private router: Router,
    private apiService: HttpServiceService
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
    this.apiService.post('auth/local', body).subscribe((response: any) => {
      console.log(response);
      if(response.token) {
        localStorage.setItem('token',response.token);
        // this.dataService.setToken(response.token, response.user);
        Storage.set({ key : 'token', value : JSON.stringify(response.token) });
        Storage.set({ key : 'user', value : JSON.stringify(response.user) });
        this.router.navigateByUrl('/tabs/dispatch');
      }
    }, err => {
      console.log(err.status);
        console.log(err.error); // error message as string
        console.log(err.headers);
        if(err && err.error) {
          this.errorMessage = err.error.message;
        }
    });
    // this.http.post(endpoint, body, {})
    //   .then(data => {
    //     localStorage.setItem('token',data.data.token);
    //     this.dataService.setToken(data.data.token, data.data.user);
    //     console.log(data.status);
    //     console.log('### data: ' + data.data); // data received by server
    //     console.log(data.headers);
    //     const respBody = JSON.parse(data.data);
    //     console.log('### setting token: ' + JSON.stringify(data.data.token));
    //     Storage.set({ key : 'token', value : JSON.stringify(respBody.token) });
    //     Storage.set({ key : 'user', value : JSON.stringify(respBody.user) });
    //     this.router.navigateByUrl('/tabs/dispatch');
    //   })
    //   .catch(error => {

    //     console.log(error.status);
    //     console.log(error.error); // error message as string
    //     console.log(error.headers);
    //     if(error && error.error) {
    //       this.errorMessage = error.error.message;
    //     }


    //   });
  }

}
