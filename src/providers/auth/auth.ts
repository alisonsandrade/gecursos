import { LoginPage } from './../../pages/login/login';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(
    public http: HttpClient, 
    public storage: Storage,
    public toastCtrl: ToastController) {
    console.log('Hello AuthProvider Provider');
  }

  login(credential) {
    return this.getStorageItem('users').then(result => {
      result.map( _data => {
        if (_data.username === credential.username && _data.password === credential.password) {
          var index = result.map(e => e.id).indexOf(credential.id);
          result[index].token = true;
          this.setStorageItem('users', result);
          this.setStorageItem('credential', result[index]);
        }
      })
    });
  }

  userIsLogged(credential): boolean {
    if(credential.token){
      return true;
    } else {
      return false;
    }
  }

  logout(user){    
    this.removeStorageItem('credential');
    this.getStorageItem('users').then(result => {
      result.map(_data => {        
        var index = result.map(e => e.id).indexOf(user.id);
        result[index].token = false;
        this.setStorageItem('users', result).then( result => {          
          this.messageToast('Usuário deslogado com sucesso');
        });        
      })
    });
  }

  getStorageItem(key){
    return this.storage.get(key);
  }

  setStorageItem(key, value){
    return this.storage.set(key, value);
  }

  removeStorageItem(key){
    return this.storage.remove(key);
  }

  messageToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
    return false;
  }

}
