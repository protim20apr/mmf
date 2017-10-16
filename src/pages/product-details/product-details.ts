import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
import { OrdersReview } from '../orders-review/orders-review';
import { Cart } from '../cart/cart';
import { HttpClient } from '../../providers/http-client';

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetails {

  product: any;
  cartLength = 0;
  customerDetail: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _localStorage: LocalStorage,
              public httpClient: HttpClient        
  ) {
    this.product = this.navParams.get('product');
    this.customerDetail = this._localStorage.getCustomerDetail();
    this.cartLength = this._localStorage.getCartLength();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetails');
  }

  addToWishlist(product){
    this.httpClient.postLike(product, this.customerDetail).subscribe(
      data => {
          console.log(data);
      },
      error =>{
        console.log(error);
      }
    );
    this._localStorage.storeProductToWishList(product);
  }

  addToCart(product){
    this._localStorage.addProductToCart(product);
    this.cartLength = this._localStorage.getCartLength();
  }

  buyNow(product){
    this._localStorage.addProductToCart(product);
    this.navCtrl.push(OrdersReview)
  }

  cart(){
    this.navCtrl.push(Cart);
  }
}
