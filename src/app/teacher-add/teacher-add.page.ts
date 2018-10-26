import { Component, OnInit } from '@angular/core';
import { TeachersService, Teacher } from '../services/teachers/teachers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.page.html',
  styleUrls: ['./teacher-add.page.scss'],
})
export class TeacherAddPage implements OnInit {

  name: any;
  borndate: any;
  status: any;
  curriculum: any;

  constructor(private router: Router, private teachersService: TeachersService) { }

  ngOnInit() {
  }

  insertTeacher() {
    let teacher = new Teacher;

    teacher.nome = this.name;
    teacher.nascimento = this.borndate;
    teacher.status = this.status;
    teacher.curriculo = this.curriculum;

    if (this.teachersService.insert(teacher)) {
      this.router.navigate(['teachers']);
    };
  }

}
