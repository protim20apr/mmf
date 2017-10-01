import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
// import { OrdersResult } from '../orders-result/orders-result';
import { Dashboard } from '../dashboard/dashboard';
import { CustomerDetail } from '../customer-detail/customer-detail';


@IonicPage()
@Component({
  selector: 'page-orders-review',
  templateUrl: 'orders-review.html',
})
export class OrdersReview {

  orders: any;
  total: any = 0;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _localStorage: LocalStorage
  ) {
    this.orders = JSON.parse(localStorage.getItem('cart'));
    this.orders.forEach(order => {this.total = order.price + this.total});
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Orders');
  }

  cancel(){
    this.navCtrl.push(Dashboard)
  }
  
  placeOrder(){
    // this._localStorage.buyProducts(this.orders);
    // localStorage.removeItem('cart');
    // this.cartProductArray = [];
    // this.navCtrl.push(OrdersResult)
    this.navCtrl.push(CustomerDetail)
  }

}
