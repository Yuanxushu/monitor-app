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
  tempValue: number
  tempMin: number
  tempMax: number

  constructor(private http: Http, private storage: Storage) {
    this.tempMin = 10;
    this.tempMax = 30;
    this.getLastValue();

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

    //http://8e6a536c.ngrok.io
    //server: https://server-control.herokuapp.com
    
    this.http.post('http://8e6a536c.ngrok.io/temp', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('TEMP POST Response:', response);
    });

    this.http.get('http://8e6a536c.ngrok.io/temp/' + this.tempValue).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('TEMP GET Response:', response);
    });

    this.storage.set('temp', this.tempValue);
  }

}