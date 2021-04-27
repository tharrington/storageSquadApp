import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceFinalizePage } from './invoice-finalize.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceFinalizePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceFinalizePageRoutingModule {}
