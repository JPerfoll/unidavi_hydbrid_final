import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor(private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default',
      createFromLocation: 1
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        // Criando as tabelas
        this.createTables(db);
      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    return db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS professor (id integer primary key NOT NULL, nome VARCHAR(240), nascimento DATE, foto VARCHAR(250), curriculo VARCHAR(3000), status CHAR(1))'],
      ['CREATE TABLE IF NOT EXISTS turma (id integer primary key NOT NULL, name VARCHAR(240), ementa VARCHAR(3000), data_inicio DATE, data_fim DATE, professor integer, FOREIGN KEY(professor) REFERENCES professor(id))'],
      ['CREATE TABLE IF NOT EXISTS configuracoes (usuario_id integer primary key NOT NULL, idioma VARCHAR(15), nome VARCHAR(250))']
    ])
    .then(() => console.log('Tabelas criadas'))
    .catch(Error => console.error('Erro ao criar as tabelas', Error));
  }
}
