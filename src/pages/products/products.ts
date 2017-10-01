import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetails } from '../product-details/product-details';
import { LocalStorage } from '../../providers/local-storage';
import { OrdersReview } from '../orders-review/orders-review';
import { Cart } from '../cart/cart';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class Products {

  productList: any;
  cartLength = 0;
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _localStorage: LocalStorage) {
    console.log("Navparams are ", this.navParams.get('productList'));
    this.productList = this.navParams.get('productList');
    this.cartLength = this._localStorage.getCartLength();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Products');
  }

  productDetails(product){
    this.navCtrl.push(ProductDetails, {
      product: product
    })
  }

  addToCart(product){
    this._localStorage.addProductToCart(product);
    this.cartLength = this._localStorage.getCartLength();
  }

  cart(){
    this.navCtrl.push(Cart);
  }
}
