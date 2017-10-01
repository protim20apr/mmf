import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersResult } from './orders-result';

@NgModule({
  declarations: [
    OrdersResult,
  ],
  imports: [
    IonicPageModule.forChild(OrdersResult),
  ],
  exports: [
    OrdersResult
  ]
})
export class OrdersResultModule {}
