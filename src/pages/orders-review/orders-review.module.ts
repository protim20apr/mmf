import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersReview } from './orders-review';

@NgModule({
  declarations: [
    OrdersReview,
  ],
  imports: [
    IonicPageModule.forChild(OrdersReview),
  ],
  exports: [
    OrdersReview
  ]
})
export class OrdersReviewModule {}
