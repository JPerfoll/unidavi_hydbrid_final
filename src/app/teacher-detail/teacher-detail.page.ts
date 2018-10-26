import { Component, OnInit } from '@angular/core';
import { TeachersService, Teacher } from '../services/teachers/teachers.service';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.page.html',
  styleUrls: ['./teacher-detail.page.scss'],
})
export class TeacherDetailPage implements OnInit {

  constructor(private teachersService: TeachersService) { }

  teacher: Teacher;

  ngOnInit() {
    this.teacher = this.teachersService.teacher;
  }

  delete(id) {
    this.teachersService.deleteById(id);
  }

}
