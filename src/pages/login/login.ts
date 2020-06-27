import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private user = {
    id: 1,
    username: "",
    password: "",
    token: false
  }

  private users:Array<any>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthProvider) {

    this.authService.getStorageItem('users').then(result => {
      this.users = result;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.authService.getStorageItem('users').then(result => {
      if(!result){
        this.authService.setStorageItem('users', []);
      }
    });
  }

  login(){
    this.authService.getStorageItem('users').then(result => {
      result.map(_data => {
        if (_data.username === this.user.username && _data.password === this.user.password) {
          var index = result.map(e => e.username).indexOf(this.user.username);
          result[index].token = true;
          console.log('Credential', result[index]);
          this.authService.setStorageItem('credential', result[index]);
          this.authService.setStorageItem('users', result).then( res => {
            this.authService.messageToast('Usuário logado com sucesso!');
            this.homePage();
          });
        }
      })
    });
  }

  logout(user){
    this.authService.logout(user);
    this.navCtrl.setRoot(LoginPage);
  }

  removeUser(key) {
    this.authService.getStorageItem('users').then(result => {
      var index = result.map(e => e.id).indexOf(key);
      result.splice(index, 1);
      this.authService.setStorageItem('users', result).then(_data => {
        this.authService.messageToast('Usuário excluído com sucesso!');
        this.navCtrl.setRoot(LoginPage);
      })
    }) 
  }

  newUser(){
    this.authService.getStorageItem('users').then(result => {
      // Verifica se existe usuário cadastrado
      if(result.length === 0 || result === null){
        result.push(this.user);
      } else {
        // Verifica qual o maior ID entre os existentes no storage
        let maiorID = Math.max.apply(null, result.map(e => e.id));
        // Adiciona ID ao user cadastrado
        this.user.id = maiorID + 1;
        // Adiciona o user no array de objetos
        result.push(this.user);
      }      
      // Salva no storag
      this.authService.setStorageItem('users', result).then(_data => {
        this.authService.messageToast('Usuário cadastrado com sucesso!');
        this.navCtrl.setRoot(LoginPage);
      });
    }) 
  }

  homePage(){
    this.navCtrl.setRoot(HomePage);
  }

}
