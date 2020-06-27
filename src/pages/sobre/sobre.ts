import { HomePage } from './../home/home';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html',
})
export class SobrePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SobrePage');
  }

  homePage() {
    return this.navCtrl.setRoot(HomePage);
  }

}
