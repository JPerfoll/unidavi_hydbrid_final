import { Component, OnInit, DoCheck, AfterContentInit, AfterViewChecked, AfterViewInit, AfterContentChecked, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/guard/authentication.service';
import { TeachersService, Teacher } from '../services/teachers/teachers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.page.html',
  styleUrls: ['./teachers.page.scss'],
})
export class TeachersPage implements OnInit {

  data: any;
  fieldSearch: any;

  constructor(private router: Router, private authService: AuthenticationService, private teachersService: TeachersService) { }

  ngOnInit() {
    this.loadTeachers(null);
  }

  add() {
    this.router.navigate(['teacher-add']);
  }

  loadTeachers(event) {
    let getDbPromise = this.teachersService.getAll();

    Promise.all([getDbPromise]).then((result: any[]) => {
      this.data = result[0];

      // Se o event for nulo significa que não foi chamado pelo pull refresh
      if (event != null) {
        // Se for chamado pelo pull refresh deve usar o complete() para sumir o loading
        event.target.complete();
      }
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
