import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Plugins, registerWebPlugin } from '@capacitor/core';
import {DataService} from './api/data.service';
const {
  Storage
} = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform,
      public dataService: DataService,
      private router: Router
  ) {
    this.findToken();
  }

  async findToken() {
    const { value } = await Storage.get({ key: 'token' });
    this.initializeApp(value);
    this.dataService.initDriver();
    this.dataService.setIsTraining();
  }

  initializeApp(value: any) {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      if(value) {

        this.router.navigateByUrl('/tabs/dispatch');
      }
    });
  }
}
