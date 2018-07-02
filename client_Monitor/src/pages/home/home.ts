import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { map } from 'rxjs/operators';

import { LightPage } from '../light/light';
import { TemperaturePage } from '../temperature/temperature';
import { PressurePage } from '../pressure/pressure';
import { HumidityPage } from '../humidity/humidity';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // tempPage: TemperaturePage;
  // pressurePage: PressurePage;
  // humidityPage: HumidityPage;

  input: string;

  constructor(private http: Http, public navCtrl: NavController,
    public tempPage: TemperaturePage,
    public pressurePage: PressurePage,
    public humidityPage: HumidityPage) {

  }

  goTempPage() {
    this.navCtrl.push(TemperaturePage)
  }

  goPressurePage() {
    this.navCtrl.push(PressurePage)
  }

  goHumidityPage() {
    this.navCtrl.push(HumidityPage)
  }
  // //temperature
  // tempValue = this.tempPage.tempValue;
  // temMin = this.tempPage.tempMin;
  // temMax = this.tempPage.tempMax;

  // confirmTemp() {
  //   this.tempPage.confirmTemp();
  // }

  //humidity

  //pressure


  /************  old version **********************/
  // goLightPage() {
  //   this.navCtrl.push(LightPage)
  // }




  // inputNumber() {
  //   var data = {
  //     input: this.input
  //   };

  //   this.http.post('http://localhost:8000', data).pipe(
  //     map(res => res.json())
  //   ).subscribe(response => {
  //     console.log('POST Response:', response);
  //   });

  //   this.http.get('http://localhost:8000/' + this.input).pipe(
  //     map(res => res.json())
  //   ).subscribe(response => {
  //     console.log('GET Response:', response);
  //   });

  // }
}
