import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/guard/authentication.service';
import { Router } from '@angular/router';
import { DatabaseService } from './services/database/database.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  userName: String;

  public appPages = [
    {
      title: 'New Teacher',
      url: '/teacher-add',
      icon: 'add',
      nameFunction: ''
    },
    {
      title: 'Teachers List',
      url: '/teachers',
      icon: 'list',
      nameFunction: ''
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings',
      nameFunction: ''
    },
    {
      title: 'Logout',
      icon: 'exit',
      nameFunction: 'logout'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private databaseService: DatabaseService,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.databaseService.createDatabase().then(() => {
            this.storage.get("user-name").then((result) => {
              console.log(result);
              
              this.userName = result;
            });

            this.router.navigate(['teachers']);
          }).catch(Error => {
            console.log('Erro ao criar database ', Error);
          });          
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }

  executeLogout(name) {
    if ((name != '') && (name == 'logout')) {
      this.authenticationService.logout();
    }
  }
}
