import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule, } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupModule } from '../pages/signup/signup.module';
import { MainModule } from '../pages/main/main.module';
import { DashboardModule } from '../pages/dashboard/dashboard.module';
import { CartModule } from '../pages/cart/cart.module';
import { LogoutModule } from '../pages/logout/logout.module';
import { ProductsModule } from '../pages/products/products.module';
import { ProductDetailsModule } from '../pages/product-details/product-details.module';
import { WishlistModule } from '../pages/wishlist/wishlist.module';
import { OrdersModule } from '../pages/orders/orders.module';
import { SearchModule } from '../pages/search/search.module';
import { OrdersReviewModule } from '../pages/orders-review/orders-review.module';
import { OrdersResultModule } from '../pages/orders-result/orders-result.module';
import { CustomerDetailModule } from '../pages/customer-detail/customer-detail.module';


import { LocalStorage } from '../providers/local-storage';
import { HttpClient } from '../providers/http-client';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/* const firebaseConfig = {
    apiKey: "AIzaSyBdV8r7b643NZPrYLv4Z7DreRhclSiljcY",
    authDomain: "ecommerce-40ff9.firebaseapp.com",
    databaseURL: "https://ecommerce-40ff9.firebaseio.com",
    projectId: "ecommerce-40ff9",
    storageBucket: "ecommerce-40ff9.appspot.com",
    messagingSenderId: "989517368829"
}; */


const firebaseConfig = {
    apiKey: "AIzaSyDeTNQOFWDXFOyd369nPjNdrpWw5wsTLEY",
    authDomain: "missmyfood-ba31f.firebaseapp.com",
    databaseURL: "https://missmyfood-ba31f.firebaseio.com",
    projectId: "missmyfood-ba31f",
    storageBucket: "",
    messagingSenderId: "700321867366"
  };


@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    
    SignupModule,
    MainModule,
    HttpModule,
    DashboardModule,
    CartModule,
    LogoutModule,
    ProductsModule,
    ProductDetailsModule,
    WishlistModule,
    OrdersModule,
    SearchModule,
    OrdersReviewModule,
    OrdersResultModule,
    CustomerDetailModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalStorage,
    AngularFireDatabase,
    HttpClient
  ]
})
export class AppModule {}
