import { Component, OnInit } from '@angular/core';
import { TeachersService, Teacher } from '../services/teachers/teachers.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';

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
  base64Image: any;
  photo: any;

  constructor(private router: Router, private teachersService: TeachersService, private alertController: AlertController, private camera: Camera, private actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  async insertTeacher() {
    let teacher = new Teacher;

    teacher.nome = this.name;
    teacher.nascimento = this.borndate;
    teacher.status = this.status == false ? '0' : '1';
    teacher.curriculo = this.curriculum;
    teacher.foto = this.base64Image;    

    if (this.teachersService.insert(teacher)) {
      const alert = await this.alertController.create({
        header: 'Confirmation',
        message: 'Saved successfully!',
        buttons: ['OK']
      });
  
      await alert.present();

      this.router.navigate(['teachers']);
    };
  }

  pictureCamera() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);      
    });
  }

  pictureGallery() {
    const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);  
    });
  }

  async alterPicture(id) {
    const actionSheet = await this.actionSheetController.create({
        header: 'Choose an option',
        buttons: [
            {
                text: 'Gallery',
                icon: 'image',
                handler: () => {
                    this.pictureGallery();
                }
            }, 
            {
                text: 'Camera',
                icon: 'camera',
                handler: () => {
                    this.pictureCamera();
                }
            },
            {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {

                }
            }]
    });
    await actionSheet.present();
  }
}
