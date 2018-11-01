import { Component, OnInit } from '@angular/core';
import { TeachersService, Teacher } from '../services/teachers/teachers.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.page.html',
  styleUrls: ['./teacher-detail.page.scss'],
})
export class TeacherDetailPage implements OnInit {

  constructor(private teachersService: TeachersService, private alertController: AlertController) { }

  teacher: Teacher;

  ngOnInit() {
    this.teacher = this.teachersService.teacher;
  }

  async delete(id) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: `Do you want to delete the id ${id}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'primary',
          handler: (blah) => {
            // Do nothing
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.teachersService.deleteById(id);
          }
        }
      ]
    });

    await alert.present();    
  }

}
