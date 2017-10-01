import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
import { OrdersResult } from '../orders-result/orders-result';
import { Dashboard } from '../dashboard/dashboard';
import { FormBuilder, FormGroup } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
})
export class CustomerDetail {

  orders: any;
  // total: any = 0;
  isEditingMode: boolean;
  oldDtls: any;

  dtlForm: FormGroup;
  name: any;
  mobile: any;
  address:any;
  
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _localStorage: LocalStorage
  ) {
    this.orders = JSON.parse(localStorage.getItem('cart'));
    this.oldDtls = this._localStorage.getCustomerDetail();
    this.isEditingMode = (this.oldDtls === null || this.oldDtls.length === 0) ? true : false;
    // this.orders.forEach(order => {this.total = order.price + this.total});
  }

 ionViewDidLoad() {
    console.log('ionViewDidLoad Orders');
  }

  cancel(){
    this.navCtrl.push(Dashboard)
  }
  
  placeOrder(){
    this._localStorage.buyProducts(this.orders);
    localStorage.removeItem('cart');
    const custDtl = {
      name: this.name,
      mobile: this.mobile,
      address: this.address
    };

    if(this.name != undefined && this.mobile != undefined && this.address != undefined){
      this._localStorage.addCustomerDetail(custDtl)
    } else if((this.oldDtls !== null || this.oldDtls.length !== 0)) {
        // send detail to server for this.oldDtls[0]
    }

    // this.cartProductArray = [];
    
    this.navCtrl.push(OrdersResult)
  }

  deleteDtl(custDtl){
    this.oldDtls = this._localStorage.removeCustomerDetail(custDtl);
    this.isEditingMode = (this.oldDtls === null || this.oldDtls.length === 0) ? true : false;
  }

}
