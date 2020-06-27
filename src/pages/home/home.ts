import { SobrePage } from './../sobre/sobre';
import { CursoServiceProvider } from './../../providers/curso-service/curso-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map'
import { CursoFormularioPage } from '../curso-formulario/curso-formulario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    CursoServiceProvider,
  ]
})
export class HomePage {

  courses: string = 'next'; // Já seta o valor inicial no carregamento do app
  public listCourses = []

  constructor(
    public navCtrl: NavController,
    public http: Http,
    private cursoServiceProvider: CursoServiceProvider
  ) {

    this.cursoServiceProvider.getStorageItem('cursos').then(result => {
      if(result){
        this.listCourses = result;
      } else {
        this.cursoServiceProvider.getCursos().take(1)
          .subscribe((_data: any[]) => {
            // o take(1) faz com que a requisição só ocorra uma vez e o observable não fique executando sempre
            console.log(_data);
            this.cursoServiceProvider.setStorageItem('cursos', _data);
            this.listCourses = _data;
          }), error => {
            console.log(error);
          }
      }
    });
  }  

  ionViewDidEnter(){
   
  }

  openSobrePage(){
    this.navCtrl.push(SobrePage);
  }

  openCursoDetalhes(curso){
    console.log(curso);
    this.navCtrl.push("CursoDetalhesPage", {
      id: curso.id,
      nome: curso.nome,
      dt_realizacao: curso.dt_realizacao,
      professor: curso.professor,
      carga_horaria: 3,
      img_icon: curso.img_icon,
      concluido: curso.concluido,
      conteudo: curso.conteudo
    });
  }

  openCursoFormulario(){
    this.navCtrl.push(CursoFormularioPage);
  }

}
