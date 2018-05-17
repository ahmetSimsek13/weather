import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather: any;
  locationIp:string;
  location:{
    code:string,
    city:string,
    country:string
  }

  constructor(public navCtrl: NavController,private WeatherProv: WeatherProvider, private storage: Storage) {
    // manually storage initialization
    this.locationIp = "http://ip-api.com/json/";
  }
  callWeather(){
    this.WeatherProv.getWeather(this.location.code,this.location.city)   // cause of then put inside
    .subscribe(data => {
      console.log("subscribed");
       this.weather = data.current_observation;
  });
  }

  ionViewWillEnter(){ //onInit in angular
    this.storage.get('location').then((val) =>{
      if(val != null){
        console.log("data taken");
        this.location = JSON.parse(val);
        this.callWeather();
      }
      else{
        console.log("data cannot be taken");
        this.WeatherProv.getLocation(this.locationIp).subscribe(data =>{
          this.location = {
            code: data.countryCode,
            city: data.city,
            country: data.country
          }
          this.callWeather();
        });
      }
        /*this.location = {
          code: 'TR',
          city: 'Izmir'
        }*/

 //     this.WeatherProv.getWeather(this.location.code,this.location.city)   // cause of then put inside
   //     .subscribe(data => {
     //     console.log("subscribed");
       //    this.weather = data.current_observation;
    //  });
    });
 /*   this.location = {
      city: 'Miami',
      state: 'FL'
    }*/ //This is manual initialization for testing
  }
}

