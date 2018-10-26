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
    this.loadTeachers();
  }

  add() {
    this.router.navigate(['teacher-add']);
  }

  loadTeachers() {
    let getDbPromise = this.teachersService.getAll();

    Promise.all([getDbPromise]).then((result: any[]) => {
      this.data = result[0];      
    });
  }

  logout() {
    this.authService.logout();
  }

  openDetail(id) {
    this.teachersService.getById(id);  
  }

  search() {
    console.log(this.fieldSearch);
    if ((this.fieldSearch != "") && (this.fieldSearch != undefined)) {
      let getDbNamePromise = this.teachersService.getByName(this.fieldSearch);

      Promise.all([getDbNamePromise]).then((result: any[]) => {
        this.data = result[0];      
      });
    } else {
      this.loadTeachers();
    }
  }

  
}
