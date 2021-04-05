import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { Plugins, registerWebPlugin } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform,
              // private splashScreen: SplashScreen,
              // private statusBar: StatusBar,
              private router: Router
  ) {
    this.findToken();
  }

  async findToken() {
    const { value } = await Storage.get({ key: 'token' });
    console.log('### got value: ' + value);
    this.initializeApp(value);
  }

  initializeApp(value : any) {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      if(value) {
        this.router.navigateByUrl('/tabs/tabs/dispatch');
      }
    });
  }
}
