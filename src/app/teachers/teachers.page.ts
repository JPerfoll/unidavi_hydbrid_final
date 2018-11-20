import { Component, OnInit} from '@angular/core';
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

  TIME_TO_EXECUTE = 30000;
  data: any;
  fieldSearch: any;
  interval: any;

  constructor(private router: Router, private authService: AuthenticationService, private teachersService: TeachersService, private loadingController: LoadingController) { }

  ngOnInit() {
    // Task que lê/envia as alterações do/para o backend
    this.interval = setInterval(() => { 
      this.sendTeachers();
      this.loadTeachers(null, false);      
    }, this.TIME_TO_EXECUTE);
  }

  ionViewWillEnter(){
    this.loadTeachers(null, true);    
  }

  add() {
    this.router.navigate(['teacher-add']);
  }

  async loadTeachers(event, showLoading) {
    let loading;

    if (showLoading) {
      loading = await this.loadingController.create({
        animated: true,
        duration: 5000,
        message: 'Loading...',      
        cssClass: 'custom-class custom-loading'
      });
  
      loading.present();
    }

    let getDbPromise = this.teachersService.getAll();

    Promise.all([getDbPromise]).then((result: any[]) => {
      this.data = result[0];

      if (event != null) {
        event.target.complete();        
      }

      if (showLoading) {
        loading.dismiss();
      }      
    });    
  }

  logout() {
    clearInterval(this.interval);
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
      this.loadTeachers(null, true);
    }
  }

  async sendTeachers() {    
    let sendDbPromise = this.teachersService.sendAll(this.data);

    Promise.all([sendDbPromise]).catch((Error) => {
      console.log("Erro ao enviar professores: ", Error);      
    });
  }
}
