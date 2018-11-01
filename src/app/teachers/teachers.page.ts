import { Component, OnInit, DoCheck, AfterContentInit, AfterViewChecked, AfterViewInit, AfterContentChecked, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/guard/authentication.service';
import { TeachersService, Teacher } from '../services/teachers/teachers.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.page.html',
  styleUrls: ['./teachers.page.scss'],
})
export class TeachersPage implements OnInit {

  data: any;
  fieldSearch: any;

  constructor(private router: Router, private authService: AuthenticationService, private teachersService: TeachersService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadTeachers(null);
  }

  add() {
    this.router.navigate(['teacher-add']);
  }

  async loadTeachers(event) {
    const loading = await this.loadingController.create({
      animated: true,
      duration: 5000,
      message: 'Loading...',      
      cssClass: 'custom-class custom-loading'
    });

    loading.present();

    let getDbPromise = this.teachersService.getAll();

    Promise.all([getDbPromise]).then((result: any[]) => {
      this.data = result[0];

      if (event != null) {
        event.target.complete();        
      }

      loading.dismiss();
    });    
  }

  logout() {
    this.authService.logout();
  }

  openDetail(id) {
    this.teachersService.getById(id);  
  }

  search(texto: any) {
    let textoPesquisa = texto.target.value;
        
    if ((textoPesquisa != "") && (textoPesquisa != undefined)) {
      let getDbNamePromise = this.teachersService.getByName(textoPesquisa);

      Promise.all([getDbNamePromise]).then((result: any[]) => {
        this.data = result[0];      
      });
    } else {
      this.loadTeachers(null);
    }
  }

  
}
