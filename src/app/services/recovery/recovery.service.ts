import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'text/xml' })
};

@Injectable({
  providedIn: 'root'
})

export class RecoveryService {

  constructor(private http: HttpClient) { }

  recovery(email) {
    const postedData = {
        email: email
    };

    return this.http.post(`${API_URL}/unidavi/recuperasenha.php`, postedData, httpOptions);
  }
}
