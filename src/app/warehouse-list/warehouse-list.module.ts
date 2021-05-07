import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WarehouseListPageRoutingModule } from './warehouse-list-routing.module';

import { WarehouseListPage } from './warehouse-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WarehouseListPageRoutingModule
  ],
  declarations: [WarehouseListPage]
})
export class WarehouseListPageModule {}
