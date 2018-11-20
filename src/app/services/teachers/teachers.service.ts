import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DatabaseService } from '../database/database.service';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';

const API_URL = environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class Teacher {
  id: number;
  nome: string;
  nascimento: Date;
  foto: any;
  curriculo: string;
  status: string;
}

@Injectable()
export class TeachersService {

  teacher: Teacher;
  teachers: any;
  dataDb: any;

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
          this.dataDb = data;  
          let teachersList: any[]=[];        

          if (data.rows.length > 0) {
            console.log(this.dataDb);
  
            for (let i = 0; i < data.rows.length; i++) {
              var teacher = data.rows.item(i);
              teachersList.push(teacher);
            }
          } 

          this.http.get(`${API_URL}/unidavi/professor.php`).subscribe(dataGet => {
            let newTeacher = new Teacher;
            let bAdicionaArray = true;
            
            for (let j = 0; j < dataGet['length']; j++) {
              newTeacher = dataGet[j];
              this.insert(newTeacher);

              if (this.dataDb.rows.length > 0) {
                for (let k = 0; k < this.dataDb.rows.length; k++) {
                  if (this.dataDb.rows.item(k).id == newTeacher.id) {
                    bAdicionaArray = false;
                    break;
                  }
                }
              } 
              
              if (bAdicionaArray) {
                teachersList.push(newTeacher);  
              }              
            }
          });
          
          resolve(teachersList);
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
      let sql = "insert or replace into professor(id, nome, nascimento, foto, curriculo, status) values (?, ?, ?, ?, ?, ?)";
      let parameters = [teacher.id, teacher.nome, teacher.nascimento, teacher.foto, teacher.curriculo, teacher.status];

      return db.executeSql(sql, parameters).catch((Error) => {
        console.log("Erro ao inserir: ", Error);
      });
    });
  }

  update(teacher: Teacher) {
    return this.databaseService.getDB().then((db: SQLiteObject) => {
        let sql = 'update professor set nome = ?, nascimento = ?, foto = ?, curriculo = ?, status = ? where id = ?';
        let parameters = [teacher.nome, teacher.nascimento, teacher.foto, teacher.curriculo, teacher.status, teacher.id];
 
        return db.executeSql(sql, parameters).catch((Error) => {
          console.log("Erro ao realizar update: ", Error)
        });
      })
      .catch((e) => console.error(e));
  }

  sendAll(list: any): Promise<any[]> {    
    return new Promise((resolve, reject) => {
      let result: any;
      const postedData = {
        json: list
      };

      result = this.http.post(`${API_URL}/unidavi/professor_insert.php`, JSON.stringify(postedData), httpOptions).subscribe((resultado) => {        
        result = resultado;
        resolve(result);
      })
    });
  }  
}
