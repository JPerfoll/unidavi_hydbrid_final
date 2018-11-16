import { Component, OnInit } from '@angular/core';
import { TeachersService, Teacher } from '../services/teachers/teachers.service';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.page.html',
  styleUrls: ['./teacher-detail.page.scss'],
})
export class TeacherDetailPage implements OnInit {

  constructor(private teachersService: TeachersService, private alertController: AlertController, private camera: Camera) { }

  teacher: Teacher;
  status: any;

  ngOnInit() {
    this.teacher = this.teachersService.teacher;

    this.status = this.teacher.status == '0' ? false : true;
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
        }, 
        {
          text: 'Yes',
          handler: () => {
            this.teachersService.deleteById(id);
          }
        }
      ]
    });

    await alert.present();    
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.teacher.foto = 'data:image/jpeg;base64,' + imageData;
      this.teachersService.update(this.teacher);
    }, (err) => {
      console.log(err);      
    });
  }

}
