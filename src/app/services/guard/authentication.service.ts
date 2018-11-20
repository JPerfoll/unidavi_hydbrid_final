import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform, AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

const TOKEN_KEY = 'auth-token';
const TOKEN_EXPIRATION = 'auth-token-expiration';
const USER_NAME = 'user-name';
const USER_ID = 'user-id';
const API_URL = environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'text/xml' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private platform: Platform, private http: HttpClient, private alertController: AlertController) {
    moment.locale('pt-br');

    this.platform.ready().then(() => {
      this.checkToken();
    });
  }

  async alertLogin() {
    const alertController = await this.alertController.create({
      header: 'Alert',
      message: 'Wrong user or password!',
      buttons: ['OK']
    });

    await alertController.present();
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(result => {
      if (result) {
        this.authenticationState.next(true);
      } else {
        this.authenticationState.next(false);
      }
    });
  }

  login(credentials) {
    const postedData = {usuario: credentials.user, senha: credentials.password};
    const date = moment();

    this.http.post(`${API_URL}/unidavi/usuario.php`, postedData, httpOptions).subscribe(result => {      
      if (result['success'] === true) {
        return this.storage.set(TOKEN_EXPIRATION, date).then(() => {
          this.storage.set(TOKEN_KEY, result['data'].token).then(() => {
            this.storage.set(USER_ID, result['data'].id).then(() => {
              this.storage.set(USER_NAME, postedData.usuario).then(() => {
                this.authenticationState.next(true);
              });          
            })              
          });
        });         
      } else {
        this.alertLogin();
      }
    },
    error => {
      console.log('Error', error);
      this.alertLogin();
      this.authenticationState.next(false);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    if (this.authenticationState.value) {
      this.checkTokenExpiration();
    }
    
    return this.authenticationState.value;
  }

  checkTokenExpiration() {
    this.storage.get(TOKEN_EXPIRATION).then((result) => {
      let date1 = moment();
      let date2 = moment(result);
      let diff = date1.diff(date2, 'hours');

      // Se faz mais de uma hora, remove o token e a data de expiração
      if (diff >= 1) {
        return this.storage.remove(TOKEN_EXPIRATION).then(() => {
          this.storage.remove(TOKEN_KEY).then(() => {
            this.storage.remove(USER_NAME).then(() => {
              this.authenticationState.next(false);
            });            
          });
        });        
      } else { // Se não faz mais de uma hora, renova a data de expiração para a data atual
        let dataTokenNova = moment();

        return this.storage.set(TOKEN_EXPIRATION, dataTokenNova);
      }
    });    
  }
}
