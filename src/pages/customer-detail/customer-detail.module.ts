import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerDetail } from './customer-detail';

@NgModule({
  declarations: [
    CustomerDetail,
  ],
  imports: [
    IonicPageModule.forChild(CustomerDetail),
  ],
  exports: [
    CustomerDetail
  ]
})
export class CustomerDetailModule {}
