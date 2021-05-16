import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'warehouse-list',
    loadChildren: () => import('./warehouse-list/warehouse-list.module').then( m => m.WarehouseListPageModule)
  },
  {
    path: 'search/detail/:id',
    loadChildren: () => import('src/app/search/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'tabs/dispatch/drivers',
    loadChildren: () => import('src/app/drivers/drivers.module').then(m => m.DriversPageModule)
  },
  { path: 'tabs/dispatch/shipping-labels', loadChildren: () => import('src/app/shipping-labels/shipping-labels.module').then( m => m.ShippingLabelsPageModule) },
  { path: 'tabs/dispatch/order',  loadChildren: () => import('src/app/order/order.module').then( m => m.OrderPageModule) },
  { path: 'tabs/dispatch/invoice-create', loadChildren: () => import('src/app/invoice-create/invoice-create.module').then( m => m.InvoiceCreatePageModule) },
  { path: 'tabs/dispatch/invoice-finalize', loadChildren: () => import('src/app/invoice-finalize/invoice-finalize.module').then( m => m.InvoiceFinalizePageModule) }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
