import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {
  apiKey = '3890227f35c36f55';
  url;
  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
    this.url = 'http://api.wunderground.com/api/'+this.apiKey+'/conditions';
  }

  getWeather(code,city) {
    console.log("Code: "+code);
    return this.http.get(this.url+'/q/'+code+'/'+city+'.json')
    .map(res => res.json());
  }
  getLocation(locationUrl){
    return this.http.get(locationUrl).map(res =>res.json());
  }
  getCodes(codesUrl){
    return this.http.get(codesUrl).map(res =>res.json());
  }


}
