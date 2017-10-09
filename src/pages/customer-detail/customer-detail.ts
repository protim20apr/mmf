import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
import { OrdersResult } from '../orders-result/orders-result';
import { Dashboard } from '../dashboard/dashboard';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '../../providers/http-client';


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
  address: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _localStorage: LocalStorage,
    private httpClient: HttpClient
  ) {
    this.orders = JSON.parse(localStorage.getItem('cart'));
    this.oldDtls = this._localStorage.getCustomerDetail();
    this.isEditingMode = (this.oldDtls === null || this.oldDtls.length === 0) ? true : false;
    // this.orders.forEach(order => {this.total = order.price + this.total});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Orders');
  }

  cancel() {
    this.navCtrl.push(Dashboard)
  }

  placeOrder() {
    const custDtl = {
      name: this.name,
      mobile: this.mobile,
      address: this.address
    };

    let result = undefined;
    if (this.name != undefined && this.mobile != undefined && this.address != undefined) {
      this._localStorage.addCustomerDetail(custDtl)
      result = this.httpClient.buy(this.orders, custDtl);
    } else if ((this.oldDtls !== null || this.oldDtls.length !== 0)) {
      result = this.httpClient.buy(this.orders, this.oldDtls[0]);
    }
    result.subscribe(
      address => {
        console.log("got here as well");
        this.removeOrderAndRedirect({ "kitchen":{ "msg": "Your order has been placed. Your food will be delivered very soon." }});
      },
      error => {
        console.log(error);
        this.removeOrderAndRedirect({ "kitchen":{ "msg": "OOPS!!! The kitchen is not available right at the moment. But don't worry we will get back to you. In the meanwhile write something to us." }});
      }
    );
  }

  removeOrderAndRedirect(kitchenMsg) {
    this._localStorage.buyProducts(this.orders);
    localStorage.removeItem('cart');
    this.navCtrl.push(OrdersResult, kitchenMsg);
  }

  deleteDtl(custDtl) {
    this.oldDtls = this._localStorage.removeCustomerDetail(custDtl);
    this.isEditingMode = (this.oldDtls === null || this.oldDtls.length === 0) ? true : false;
  }

}
