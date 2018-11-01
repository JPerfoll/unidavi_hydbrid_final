import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DatabaseService } from '../database/database.service';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';

const API_URL = environment.apiURL;


@Injectable({
  providedIn: 'root'
})

export class Teacher {
  id: number;
  nome: string;
  nascimento: Date;
  foto: string;
  curriculo: string;
  status: string;
}

@Injectable()
export class TeachersService {

  teacher: Teacher;
  teachers: any;

  constructor(private http: HttpClient, private databaseService: DatabaseService, private router: Router) { }

  deleteById(id) {
    return this.databaseService.getDB().then((db: SQLiteObject) => {
      let sql = "delete from professor where id = ?";
      let parameters = [id];

      return db.executeSql(sql, parameters).then((data: any) => {
        this.router.navigate(["teachers"]);
      }).catch((Error) => { 
        console.log("Erro ao deletar o id ", id, ": ", Error)
      });
    }).catch((Error) => {
      console.log("Erro ao abrir o banco de dados ", Error);
    });
  }

  getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.databaseService.getDB().then((db: SQLiteObject) => {
        let sql = `SELECT * FROM professor ORDER BY upper(nome)`;
  
        db.executeSql(sql, []).then((data: any) => {
          if (data.rows.length > 0) {
            let teachers: any[]=[];
  
            for (var i = 0; i < data.rows.length; i++) {
              var teacher = data.rows.item(i);
              teachers.push(teacher);
            }

            resolve(teachers);
          } else {
            this.http.get(`${API_URL}/unidavi/professor.php`).subscribe(data => {
              let newTeacher = new Teacher;
              let teachers: any[]=[];

              for (var i = 0; i < data['length']; i++) {
                newTeacher = data[i];
                this.insert(newTeacher);
                teachers.push(newTeacher);
              }

              resolve(teachers);
            })
          }
        }).catch((Error) => {
          reject("Erro ao carregar professores: " + Error);
          console.log("Erro ao carregar professores: ", Error);
        });
      }).catch((Error) => {
        console.log("Erro GETDB: " + Error);
      });
    });    
  }

  getById(id) {
    this.databaseService.getDB().then((db: SQLiteObject) => {
      let sql = "SELECT * FROM professor WHERE id = ?";
      let parameters = [id];

      return db.executeSql(sql, parameters).then((data: any) => {
        if (data.rows.length > 0) {
          let item = data.rows.item(0);
          this.teacher = new Teacher;

          this.teacher.id = item.id;
          this.teacher.nome = item.nome;
          this.teacher.nascimento = item.nascimento;
          this.teacher.foto = item.foto;
          this.teacher.curriculo = item.curriculo;
          this.teacher.status = item.status;

          this.router.navigate(['teacher-detail']);
        } else {
          console.log("Registro não encontrado.", id);
        }        
      }).catch((Error) => {
        console.log("Erro SQL ID: ", Error);
      });
    }).catch((Error) => {
      console.log("Erro ID: ", Error);
    });
  }

  getByName(searchName): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.databaseService.getDB().then((db: SQLiteObject) => {
        let sql = `SELECT * FROM professor WHERE nome LIKE '%${searchName}%'`;
  
        db.executeSql(sql, []).then((data: any) => {
          if (data.rows.length > 0) {
            let teachers: any[]=[];
  
            for (var i = 0; i < data.rows.length; i++) {
              var teacher = data.rows.item(i);
              teachers.push(teacher);
            }

            resolve(teachers);
          } else {
            resolve([]);
            reject("Erro ao carregar professores filtrando por nome.");
          }
        }).catch((Error) => {
          console.log("Erro Execute SQL Nome: ", Error);
        });
      }).catch((Error) => {
        console.log("Erro GETDB Nome: " + Error);
      });
    });    
  }

  getTeachersBackEnd(url): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http.get(`${API_URL}/${url}`).subscribe(data => {
        this.teachers = [];
  
        for (var i = 0; i < data["length"]; i++) {
          var teacher = data[i];
          this.teachers.push(teacher);
        }
        
        resolve(this.teachers);
      }); 
    })
  }

  insert(teacher: Teacher) {
    return this.databaseService.getDB().then((db: SQLiteObject) => {
      let sql = "insert into professor(nome, nascimento, foto, curriculo, status) values (?, ?, ?, ?, ?)";
      let parameters = [teacher.nome, teacher.nascimento, teacher.foto, teacher.curriculo, teacher.status];

      return db.executeSql(sql, parameters).catch((Error) => {
        console.log("Erro ao inserir: ", Error);
      });
    });
  }
}
