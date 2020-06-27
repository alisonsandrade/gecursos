import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';


@Injectable()
export class CursoServiceProvider {

  constructor(
    public http: HttpClient, 
    public storage: Storage,
    public toastCtrl: ToastController) {
    console.log('Hello CursoServiceProvider Provider');
  }

  getCursos() {
    return this.http.get('assets/db/cursos.json');
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

  messageToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
    return false;
  }

}
