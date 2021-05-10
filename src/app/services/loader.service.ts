import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(private loadingController: LoadingController) {
   }

  async presentLoading(message?) {
    const check = await this.loadingController.getTop();
    if (check) {
      this.loadingController.dismiss();
    }
    const loading = await this.loadingController.create({
      message: (message ? message : 'Please Wait'),
      spinner: 'bubbles'
    });
    loading.present();
  }
  async hideLoading() {
    this.loadingController.dismiss();
  }
}
