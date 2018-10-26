import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/guard/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any;
  password: any;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login({"user": this.user, "password": this.password});
  }

}
