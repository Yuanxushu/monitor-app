import { Component } from '@angular/core';
import { Http } from '@angular/http';
//import { NavController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-temperature',
  templateUrl: 'temperature.html'
})
export class TemperaturePage {
  host: string

  tempValue: number
  tempMin: number
  tempMax: number

  constructor(private http: Http, private storage: Storage) {
    this.tempMin = 10;
    this.tempMax = 30;
    this.getLastValue();
    this.host = 'http://55ce3faa.ngrok.io';

  }

  getLastValue() {
    this.storage.get('temp').then((value) => {
      if (value == null) {
        this.tempValue = this.tempMin;
      }
      else {
        this.tempValue = value;
      }
    })
  }

  showValue(temp) {
    this.tempValue = temp;

  }
  
  confirmTemp() {
    var data = {
      tempValue: this.tempValue
    }

    //http://580314eb.ngrok.io
    //server: https://server-control.herokuapp.com
    
    this.http.post(this.host + '/temp', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('TEMP POST Response:', response);
    });

    this.http.get(this.host + '/temp/' + this.tempValue).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('TEMP GET Response:', response);
    });

    this.storage.set('temp', this.tempValue);
  }

}