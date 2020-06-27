import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CursoServiceProvider } from '../../providers/curso-service/curso-service';


@IonicPage()
@Component({
  selector: 'page-curso-formulario',
  templateUrl: 'curso-formulario.html',
})
export class CursoFormularioPage {

  private curso = {
    id: 1,
    nome: "",
    professor: "",
    dt_realizacao: "",
    carga_horaria: 0,
    img_icon: "assets/imgs/avatar-ionic.png",
    conteudo: ["Introdução", "Modelo de Arquitetura", "Utilização Prática"],
    concluido: false
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private cursoServiceProvider: CursoServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CursoFormularioPage');
  }

  homePage(){
    this.navCtrl.setRoot(HomePage);
  }

  cadastrarCurso(){
    this.cursoServiceProvider.getStorageItem('cursos').then(result => {
      // Verifica qual o maior ID entre os existentes no storage
      let maiorID = Math.max.apply(null, result.map(e => e.id) );
      // Adiciona ID ao curso cadastrado
      this.curso.id = maiorID + 1;
      // Adiciona o curso no array de objetos
      result.push(this.curso);
      // Salva no storag
      this.cursoServiceProvider.setStorageItem('cursos', result).then( _data => {
        this.cursoServiceProvider.messageToast('Curso cadastrado com sucesso!');
        this.navCtrl.setRoot(HomePage);
      });      
    })    
  }

}
