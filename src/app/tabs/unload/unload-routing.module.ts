import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnloadPage } from './unload.page';

const routes: Routes = [
  {
    path: '',
    component: UnloadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnloadPageRoutingModule {}
