import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { WeatherProvider } from '../../providers/weather/weather';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  city:string;    //ngmodel
  code:string;
  country:string;  // ngmodel
  locationIp:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage,private WeatherProv: WeatherProvider) {
 /*   this.locationIp = "http://ip-api.com/json/";
    this.storage.get('location').then((val) => {
      console.log("settings page data cannot be taken");
      if(val != null){
        let location = JSON.parse(val);
        this.code = location.code;
        this.city = location.city;
        this.country = location.country;
      }
      else{
        console.log("settings page data taken");
        this.WeatherProv.getLocation(this.locationIp).subscribe(data =>{
            let location = {
            code: data.countryCode,
            city: data.city,
            country: data.country
          }
        });
      }
    });*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  saveForm() {
    let codeUrl = '../../assets/country.json';
    let codes:string [] = [];
    console.log("Secilen ulke: "+this.country);
    this.WeatherProv.getCodes(codeUrl).subscribe(data =>{
        for(var i= 0; i < data.length;i++){
          if(data[i].countryName == this.country)
            this.code = data[i].countryCode;
        }
    let location = {
      city: this.city,
      code: this.code,
      country: this.country
    }
    console.log("data saved :"+JSON.stringify(location))
    this.storage.set('location',JSON.stringify(location));
    this.navCtrl.push(HomePage);
  });

/*    let location = {
      city: this.city,
      code: this.code,
      country: this.country
    }
    console.log("data saved :"+JSON.stringify(location))
    this.storage.set('location',JSON.stringify(location));
    this.navCtrl.push(HomePage);*/
  }

}
