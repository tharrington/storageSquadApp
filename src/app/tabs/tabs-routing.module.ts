import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dispatch',
        children : [
          { path: '', loadChildren: () => import('../dispatch/dispatch.module').then(m => m.DispatchPageModule) },
          { path: 'drivers', loadChildren: () => import('../drivers/drivers.module').then(m => m.DriversPageModule) },
          { path: 'shipping-labels', loadChildren: () => import('../shipping-labels/shipping-labels.module').then( m => m.ShippingLabelsPageModule) },
          { path: 'order',  loadChildren: () => import('../order/order.module').then( m => m.OrderPageModule) },
          { path: 'invoice-create', loadChildren: () => import('../invoice-create/invoice-create.module').then( m => m.InvoiceCreatePageModule) },
          { path: 'invoice-finalize', loadChildren: () => import('../invoice-finalize/invoice-finalize.module').then( m => m.InvoiceFinalizePageModule) }
        ]
      },
      { path: 'search', loadChildren: () => import('../search/search-routing.module').then(m => m.SearchPageRoutingModule) },

    ]
  },
  { path: '', redirectTo: '/tabs/dispatch', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
