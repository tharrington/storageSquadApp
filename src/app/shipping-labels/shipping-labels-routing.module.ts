import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShippingLabelsPage } from './shipping-labels.page';

const routes: Routes = [
  {
    path: '',
    component: ShippingLabelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShippingLabelsPageRoutingModule {}
