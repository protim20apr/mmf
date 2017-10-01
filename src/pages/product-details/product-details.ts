import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
import { OrdersReview } from '../orders-review/orders-review';
import { Cart } from '../cart/cart';

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {

  product: any;
  cartLength = 0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _localStorage: LocalStorage            
  ) {
    this.product = this.navParams.get('product');
    this.cartLength = this._localStorage.getCartLength();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetails');
  }

  addToWishlist(product){
    console.log(product);
    console.log('Adding it to wishlist');
    this._localStorage.storeProductToWishList(product);
  }

  addToCart(product){
    this._localStorage.addProductToCart(product);
  }

  buyNow(product){
    this._localStorage.addProductToCart(product);
    this.navCtrl.push(OrdersReview)
  }

  cart(){
    this.navCtrl.push(Cart);
  }
}
