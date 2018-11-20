import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  userId: any;
  language: any;
  name: any;

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {
    this.storage.get('user-id').then((result) => {
      this.userId = result;
    });
  }

  goToList() {
    this.router.navigate(['teachers']);
  }

}
