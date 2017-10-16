import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { Main } from '../pages/main/main';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private storage: Storage,
              private afAuth: AngularFireAuth
    ) {
    platform.ready().then(() => {
      //Angular Authentication
      const authObserver = afAuth.authState.subscribe( user => {
        if(user) {
          this.rootPage = Main;
          authObserver.unsubscribe();
        }else{
          this.rootPage = Main;
          // this.rootPage = HomePage;
          authObserver.unsubscribe();
        }
      });


      // set status bar to white
      statusBar.backgroundColorByHexString("#00ABE7");
      
      splashScreen.hide();
    });
  }
}

