import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
import { ProductDetails } from '../product-details/product-details';
import { HttpClient } from '../../providers/http-client';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class Notification {

  notificationArray: any[] = [];
  notification: any;
  logoUrl: any = "https://i.imgur.com/I7rlGnd.png";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _localStorage: LocalStorage,
    public httpClient: HttpClient
  ) {
    this.notificationArray = this._localStorage.getNotifications();
    this.notification = this.navParams.get("notification");
    if(this.notification != undefined && this.notification != null){
      this.addNotification();
    }
  }

  productPage(product) {
    this.navCtrl.push(ProductDetails, {
      product: product
    });
  }

  addNotification() {
    if (this.notification !== undefined) {
      this._localStorage.addNotification(this.notification);
      this.notificationArray = this._localStorage.getNotifications();
    }
  }

  removeNotification(notification) {
    this.notificationArray = this._localStorage.removeNotifications(notification);
    this.notificationArray = this._localStorage.getNotifications();
  }

}
