import { Component, OnInit } from '@angular/core';
import { TeachersService, Teacher } from '../services/teachers/teachers.service';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.page.html',
  styleUrls: ['./teacher-detail.page.scss'],
})
export class TeacherDetailPage implements OnInit {

  constructor(private teachersService: TeachersService, private alertController: AlertController, private camera: Camera) { }

  teacher: Teacher;
  editable: boolean;
  title: String;

  name: any;
  active: any;
  bornDate: any;
  curriculum: any;  

  ngOnInit() {
    this.title = 'Teacher Detail';
    this.editable = false;

    this.teacher = this.teachersService.teacher;

    this.name = this.teacher.nome;
    this.active = this.teacher.status == '0' ? false : true;
    this.bornDate = this.teacher.nascimento;
    this.curriculum = this.teacher.curriculo;
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

  editForm() {
    this.editable = !this.editable;
    this.title = this.editable == true ? 'Teacher Edit' : 'Teacher Detail';
  }

  updateForm() {
    this.editable = false;

    this.teacher.nome = this.name;
    this.teacher.status = this.active == false ? "0" : "1"; 
    this.teacher.nascimento = this.bornDate;
    this.teacher.curriculo = this.curriculum;
    
    this.teachersService.update(this.teacher);
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
    }, (err) => {
      console.log(err);      
    });
  }

}
