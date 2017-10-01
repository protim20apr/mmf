import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetails } from '../product-details/product-details';
import { LocalStorage } from '../../providers/local-storage';
import { OrdersReview } from '../orders-review/orders-review';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class Products {

  productList: any;
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public localStorage: LocalStorage) {
    console.log("Navparams are ", this.navParams.get('productList'));
    this.productList = this.navParams.get('productList');
    
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
    this.localStorage.addProductToCart(product);
  }

  buyNow(product){
    this.localStorage.addProductToCart(product);
    this.navCtrl.push(OrdersReview)
  }
}
