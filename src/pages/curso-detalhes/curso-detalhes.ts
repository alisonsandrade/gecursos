import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CursoServiceProvider } from '../../providers/curso-service/curso-service';

/**
 * Generated class for the CursoDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-curso-detalhes',
  templateUrl: 'curso-detalhes.html',
})
export class CursoDetalhesPage {

  private id: number
  private nome: string
  private professor: string
  private dt_realizacao: string
  private carga_horaria: number
  private img_icon: string
  private concluido: boolean
  private conteudo: [any]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private cursoServiceProvider: CursoServiceProvider
    ) {
    this.id = navParams.get('id');
    this.nome = navParams.get('nome');
    this.professor = navParams.get('professor');
    this.dt_realizacao = navParams.get('dt_realizacao');
    this.carga_horaria = navParams.get('carga_horaria');
    this.img_icon = navParams.get('img_icon');
    this.concluido = navParams.get('concluido');
    this.conteudo = navParams.get('conteudo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CursoDetalhesPage');
  }

  homePage(){
    this.navCtrl.pop();
  }

  excluirCurso(key){
    this.cursoServiceProvider.getStorageItem('cursos').then(result => {
      var index = result.map(e => e.id ).indexOf(key);      
      result.splice(index, 1);
      this.cursoServiceProvider.setStorageItem('cursos', result).then(_data=>{
        this.cursoServiceProvider.messageToast('Curso excluído com sucesso');
        this.navCtrl.setRoot(HomePage);
      })
    })    

  }

}
