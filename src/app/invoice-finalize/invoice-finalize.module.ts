import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceFinalizePageRoutingModule } from './invoice-finalize-routing.module';

import { InvoiceFinalizePage } from './invoice-finalize.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceFinalizePageRoutingModule
  ],
  declarations: [InvoiceFinalizePage]
})
export class InvoiceFinalizePageModule {}
