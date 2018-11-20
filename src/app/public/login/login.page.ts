import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/guard/authentication.service';
import { AlertController } from '@ionic/angular';
import { RecoveryService } from '../../services/recovery/recovery.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any;
  password: any;

  constructor(private authService: AuthenticationService, private alertController: AlertController, private recoveryService: RecoveryService) { }

  ngOnInit() {

  }

  login() {
    this.authService.login({"user": this.user, "password": this.password});
  }

  async forgot(email) {
    const alert = await this.alertController.create({
    header: 'Forgot password?',
    message: 'Type the e-mail:',
    inputs: [
        {
            name: 'recovery_email',
            type: "email",
            id: 'recovery_email',
            value: email,
            placeholder: 'E-mail'
        }
    ],
    buttons: [
        {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {

            }
        }, {
            text: 'Ok',
            handler: data => {
                this.recoveryService.recovery(data.recovery_email).subscribe(data => {                  
                  if (data['success']) {
                      this.alertSuccess();                                                                 
                  } else {
                      this.alertFail(data['email']);
                  } 
                });
            }
        }
    ]
    });

    await alert.present();
  }

  async alertSuccess() {
    const alert = await this.alertController.create({
        header: 'An e-mail has been sent!',
        buttons: [
            {
                text: 'Ok',
                handler: () => {
                }
            }
        ]
    });

    await alert.present();
  }

  async alertFail(email) {
    const alert = await this.alertController.create({
        header: 'E-mail not found!',
        buttons: [
            {
                text: 'Ok',
                handler: () => {
                    this.forgot(email);
                }
            }
        ]
    });

    await alert.present();
  }
}
