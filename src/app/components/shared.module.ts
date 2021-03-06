import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import { ShowTextComponent } from './show-text/show-text.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent,
    ShowTextComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
