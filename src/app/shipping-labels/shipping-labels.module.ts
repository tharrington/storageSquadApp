import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShippingLabelsPageRoutingModule } from './shipping-labels-routing.module';

import { ShippingLabelsPage } from './shipping-labels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShippingLabelsPageRoutingModule
  ],
  declarations: [ShippingLabelsPage]
})
export class ShippingLabelsPageModule {}
