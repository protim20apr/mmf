import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetails } from '../product-details/product-details';
import { LocalStorage } from '../../providers/local-storage';
import { OrdersReview } from '../orders-review/orders-review';
import { Cart } from '../cart/cart';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class Products {

  productList: any;
  cartLength = 0;
  productTitle: any = "Products";
  commingSoon: any ;
  isCommingLoading: Boolean = false;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _localStorage: LocalStorage,
              private db: AngularFireDatabase) {
    this.productList = this.navParams.get('productList');
    this.cartLength = this._localStorage.getCartLength();
    this.productTitle = this.navParams.get("productTitle");
    if((this.productTitle === undefined || this.productTitle === "Products") &&(this.productList === undefined || this.productList === undefined || this.productList.length === 0)){
      this.db.list('/store').subscribe(data => {
        this.productList = data;
        this.productTitle = "Products";
        this.isCommingLoading = false;
      });
    }
    if(this.productList === undefined || this.productList === null || this.productList.length === 0){
      this.commingSoon = "Comming soon ....";
      this.isCommingLoading = true;
    } else {
      this.isCommingLoading = false;
      this.commingSoon = undefined;
    }
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
