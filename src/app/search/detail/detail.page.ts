import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  detail;
  total_invoice_items = 0;
  hasBike = false;
  hasMattress = false;
  constructor(
    private route: ActivatedRoute,
    private loader: LoaderService,
    private apiService: HttpServiceService
  ) { 
    const id = this.route.snapshot.params.id;
    this.fetchData(id);
  }

  ngOnInit() {
  }
  fetchData(id){
    if(!id){
      return;
    }
    this.loader.presentLoading('Searching detail');
    const url = `api/invoices/getOrderAndInvoice/${id}`;
    this.apiService.get(url).subscribe((response: any) => {
      if(response){
        this.detail = response;
        if(response.invoices && response.invoices.length > 0){
          this.detail.invoices = this.detail.invoices[0];
        }
        // if(response.invoices && response.invoices.length > 0) {
        //   //console.log('### invoices: ' + JSON.stringify(result.invoices));
        //   var items = [];
        //   var images = [];

        //   response.invoices.forEach((inv) => {
        //     if(inv.invoice_type == 'Storage Goods') {

        //       inv.items.forEach((item) => {
        //         if(item.type == 'Storage Goods' && (item.product_name != 'Late Fee- Storage Goods' && item.product_name != 'Discount')) {
        //           items.push(item);
        //         }

        //         if(item.product_name == 'Bicycle') {
        //           this.hasBike = true;
        //         }
        //         if(item.product_name == 'Mattress or Box Spring') {
        //           this.hasMattress = true;
        //         }
        //       });

        //       inv.imageURLs.forEach((item) => {
        //         images.push({
        //           src:    item,
        //           isPaid: inv.status === "Paid",
        //         });
        //       });

        //       $scope.invoice = inv;
        //       $scope.invoice.imageURLs = images;
        //       $scope.invoice.items = items;
        //     } else if(inv.invoice_type == 'Shipping') {
        //       $scope.shipping_invoice = inv;
        //     }
        //   });


        //   if($scope.shipping_invoice && $scope.shipping_invoice._id) {
        //     var total_shipping_items = 0;
        //     $scope.shipping_invoice.items.forEach(function(item) {
        //       total_shipping_items = total_shipping_items + item.quantity;
        //     });
        //     $scope.total_shipping_items = total_shipping_items;
        //   }


        //   var total_items = 0;
        //   inv.items.forEach(function(item) {
        //     if(item.type == 'Storage Goods') {
        //       total_items = total_items + item.quantity;
        //     }
        //   });
        //   $scope.total_invoice_items = total_items;
        // }
        let total_items = 0;
        this.detail.invoices.items.map((item) => {
          if(item.type == 'Storage Goods') {
            total_items = total_items + item.quantity;
          }
        });
        this.total_invoice_items = total_items;
      }
      this.loader.hideLoading();
    }, err => {
      this.loader.hideLoading();
      console.log(err);
    });
  }
}
