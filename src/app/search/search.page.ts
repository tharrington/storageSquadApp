import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../services/http-service.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  customers = [];
  pickupSeason = 'Current';
  pickupSeasonValues = ['Current', 'ALL']
  constructor(
    private apiService: HttpServiceService,
    private loader: LoaderService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  searchCustomer(event){
    if(!event.detail.value){
      return;
    }
    const url = `api/invoices/search/${event.detail.value}?pickupSeason=${this.pickupSeason}`
    this.loader.presentLoading('Searching Customer');
    this.apiService.get(url).subscribe((response: any) => {
      if(response){
        this.customers = [...response];
        console.log(this.customers);
       
      }
      this.loader.hideLoading();
    }, err => {
      this.loader.hideLoading();
      console.log(err);
    });
  }
  detail(order){
    console.log(order);
    this.router.navigate([`search/detail/${order.ssOrderId}`]);
  }
}
