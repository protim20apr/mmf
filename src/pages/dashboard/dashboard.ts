import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Products } from '../products/products';
import { Cart } from '../cart/cart';
import { LocalStorage } from '../../providers/local-storage';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Notification } from '../notification/notification';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {

  productList: any[];
  dashboardDetail: any = {
    "banner" : "https://scontent.fdel1-1.fna.fbcdn.net/v/t1.0-9/10403633_481357422016749_7093600059929499225_n.jpg?oh=b7a44a8da9df2781189f37d8eab678cd&oe=5A3E4E03",
    "breakfast" : "https://i.pinimg.com/736x/19/86/1e/19861e8b6d94dc8d7c96eba98ee32a48--breakfast-eggs-breakfast-ideas-with-eggs.jpg",
    "dinner" : "http://images.mid-day.com/images/2017/apr/3-Jika-Maas.jpg",
    "chefsspecial": "https://2.bp.blogspot.com/-doto0-w1cOU/WM_PMv86GbI/AAAAAAAAEmA/aT_jVi7mprIuLQ3rkf0MyE-s6wxUqPXwQCLcB/s1600/Pork%2BKhorika.JPG"
  };
  isLoaded: Boolean = false;
  cartLength = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _localStorage: LocalStorage,
    private modal: ModalController,
    private db: AngularFireDatabase,
    public alertCtrl: AlertController
  ) {
    this.db.list('/dashboard').subscribe(data => {
      this.dashboardDetail = data[0];
      if (this.dashboardDetail) {
        this.isLoaded = true;
      }
    });

    if (typeof FCMPlugin != 'undefined') {
      FCMPlugin.onTokenRefresh((token) => {
        this._localStorage.addOrUpdateFirebaseToken(token);
      }, (error) => {
        console.log('error retrieving token: ' + error);
      });
    }

    if (typeof FCMPlugin != 'undefined') {
      FCMPlugin.getToken((token) => {
        this._localStorage.addOrUpdateFirebaseToken(token);
      }, (error) => {
        console.log('error retrieving token: ' + error);
      });
    }

    let navFunc = function(data){
      let theData = data;
      const confirmAlert = alertCtrl.create({
        title: 'New Notification',
        message: data.alertQuestion,
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
            let result = notificationPage(theData);
            return result;
            }
          }
        ]
      });
      confirmAlert.present();
    };

    let notificationPage = function(data){
      if(data.page == "notification"){
        navCtrl.push(Notification, {"notification" : data.message});
        } else if(data.page == "chef"){
          db.list('/imissmy/chefspecial').subscribe(data => {
            let prodList = data;
            navCtrl.push(Products, {
              productList: prodList,
              productTitle: "Chef's special"
            });
          });
        } else if(data.page == "store"){
          navCtrl.push(Products);
        } else {
          navCtrl.push(Notification, {"notification" : "Upgrade the Miss my food App, you just missed one important notification"});
        }
    };
    

    if (typeof FCMPlugin != 'undefined') {
      FCMPlugin.onNotification(function (data) {
        if (data.wasTapped) {
          notificationPage(data);
        } else {
          navFunc(data);
        }
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Dashboard');
  }

  ionViewWillEnter() {
    this.cartLength = this._localStorage.getCartLength();
  }

  breakfast() {
    this.db.list('/imissmy/breakfast').subscribe(data => {
      this.productList = data;
      this.navCtrl.push(Products, {
        productList: this.productList,
        productTitle: "Breakfast"
      });
    });

  }

  dinner() {
    this.db.list('/imissmy/dinner').subscribe(data => {
      this.productList = data;
      this.navCtrl.push(Products, {
        productList: this.productList,
        productTitle: "Dinner"
      });
    });
  }

  cheffSpecial() {
    this.db.list('/imissmy/chefspecial').subscribe(data => {
      this.productList = data;
      this.navCtrl.push(Products, {
        productList: this.productList,
        productTitle: "Chef's special"
      });
    });
  }

  cart() {
    this.navCtrl.push(Cart);
  }

}
