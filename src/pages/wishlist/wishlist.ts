import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
import { ProductDetails } from '../product-details/product-details';

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class Wishlist {

  wishListArray: any[];
  customWishListArray: any[];

  wishName: any;
  wishDescription: any;

  wishImgUrl: any = "https://scontent.fdel1-1.fna.fbcdn.net/v/t1.0-9/10403302_481035542048937_9064453479279190891_n.png?oh=d3eb2d2ddf621df8ce0cc2e261a7a817&oe=5A489FE8";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _localStorage: LocalStorage
  ) {
    this.wishListArray = this._localStorage.getProduct();
    this.customWishListArray = this._localStorage.getUserWishes();
  }

  productPage(product) {
    this.navCtrl.push(ProductDetails, {
      product: product
    });
  }

  removeProduct(product) {
    console.log('Product to be deleted ', product);
    this.wishListArray = this._localStorage.deleteProductFromWishlist(product);
  }

  addWish() {
    if (this.wishName !== undefined && this.wishDescription !== undefined) {
      const userWish = {
        wishName: this.wishName,
        wishDescription: this.wishDescription
      }

      this._localStorage.removeUserWish(userWish);
      this.customWishListArray = this._localStorage.addUserWish(userWish);
      this.wishName = undefined;
      this.wishDescription = undefined;
    }
  }
  removeWish(userWish) {
    this.customWishListArray = this._localStorage.removeUserWish(userWish);
  }

  updateWish(userWish) {
    this.wishName = userWish.wishName;
    this.wishDescription = userWish.wishDescription;
    let i = 0;
    for (i = 0; i < this.customWishListArray.length; i++) {
      if (this.customWishListArray[i].wishName === userWish.wishName && this.customWishListArray[i].wishDescription === userWish.wishDescription) {
        this.customWishListArray.splice(i, 1);
        break;
      }
    }
  }


}
