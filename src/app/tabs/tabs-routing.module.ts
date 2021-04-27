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
          { path: '', loadChildren: () => import('../dispatch/dispatch-routing.module').then(m => m.DispatchPageRoutingModule) },
          { path: 'drivers', loadChildren: () => import('../drivers/drivers-routing.module').then(m => m.DriversPageRoutingModule) },
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
