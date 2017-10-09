import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
import { Dashboard } from '../dashboard/dashboard';
import { Wishlist } from '../wishlist/wishlist';


@IonicPage()
@Component({
  selector: 'page-orders-result',
  templateUrl: 'orders-result.html',
})
export class OrdersResult {

  orders: any;
  total: any = 0;
  kitchen: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _localStorage: LocalStorage
  ) {
    console.log("New Order placed")
    this.kitchen = this.navParams.get("kitchen");
  }


  tellUsWhatYouMiss(){
    this.navCtrl.push(Wishlist)
  }
  
  continueShopping(){
    this.navCtrl.push(Dashboard)
  }

}
