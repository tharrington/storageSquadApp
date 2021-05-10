import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { LoaderService } from 'src/app/services/loader.service';
import * as moment from 'moment';
import { DataService } from 'src/app/api/data.service';
@Component({
  selector: 'app-load',
  templateUrl: './load.page.html',
  styleUrls: ['./load.page.scss'],
})
export class LoadPage implements OnInit {
  loads = [];
  constructor(
    private loader: LoaderService,
    private apiService: HttpServiceService,
    public dataService: DataService
  ) { 
    this.fetchData();
  }

  ngOnInit() {
  }
  fetchData(){
    let myMoment = moment();
    myMoment.hours(0).minutes(0).seconds(0);
    let myDate = new Date(+myMoment);
    const url = 'api/dispatches/drivers/getAllDriverDispatches/'+myDate;
    this.loader.presentLoading();
    this.apiService.get(url).subscribe((response: any) => {
      console.log(response);
      if(response) {
        this.loads = response;
      }
      this.loader.hideLoading();
    }, err => {
      console.log(err);
      this.loader.hideLoading();
    });
  }
  detail(dispatch){
    console.log(dispatch);
  }
}
