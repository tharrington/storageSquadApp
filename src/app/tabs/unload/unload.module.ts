import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnloadPageRoutingModule } from './unload-routing.module';
import { SharedModule } from 'src/app/components/shared.module';

import { UnloadPage } from './unload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnloadPageRoutingModule,
    SharedModule
  ],
  declarations: [UnloadPage]
})
export class UnloadPageModule {}
