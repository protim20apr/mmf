import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Products } from '../products/products';
import { Cart } from '../cart/cart';
import { LocalStorage } from '../../providers/local-storage';
import { Search } from '../search/search';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {
  
  productList: any[];
  cartLength = 0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _localStorage: LocalStorage,
              private modal: ModalController,
              private db: AngularFireDatabase
  ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Dashboard');
  }

  ionViewWillEnter(){
    this.cartLength = this._localStorage.getCartLength();
  }

	breakfast(){
     this.db.list('/imissmy/breakfast').subscribe(data => {
       console.log('Data is ', JSON.stringify(data));
       this.productList = data;
       console.log('this.productList ', this.productList);
       this.navCtrl.push(Products,{
        productList: this.productList
      });
     });
    
  }
  
  dinner(){
    this.db.list('/imissmy/dinner').subscribe(data => {
       console.log('Data is ', JSON.stringify(data));
       this.productList = data;
       console.log('this.productList ', this.productList);
       this.navCtrl.push(Products,{
        productList: this.productList
      });
     });
  }

  cheffSpecial(){
    this.db.list('/imissmy/chefspecial').subscribe(data => {
       console.log('Data is ', data);
       this.productList = data;
       console.log('this.productList ', this.productList);
       this.navCtrl.push(Products,{
        productList: this.productList
      });
     });
  }

  cart(){
    this.navCtrl.push(Cart);
  }

  search(){
    this.navCtrl.push(Search);
  }

  
}
