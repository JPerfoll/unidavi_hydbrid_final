import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';
const API_URL = environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'text/xml' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private platform: Platform, private http: HttpClient) {
    this.platform.ready().then(() => {
      this.checkToken();
    });
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

    this.http.post(`${API_URL}/unidavi/usuario.php`, postedData, httpOptions).subscribe(result => {
      if (result['success'] == true) {
        console.log('Token', result['data'].token);
        return this.storage.set(TOKEN_KEY, result['data'].token).then(() => {
          this.authenticationState.next(true);
        });
      }
    },
    error => {
      console.log('Error', error);
      this.authenticationState.next(false);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
