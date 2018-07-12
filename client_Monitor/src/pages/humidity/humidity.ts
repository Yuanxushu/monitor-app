import { Component } from '@angular/core';
import { Http } from '@angular/http';
//import { NavController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-humidity',
  templateUrl: 'humidity.html'
})
export class HumidityPage {
  host: string

  humiValue: number
  humiMin: number
  humiMax: number
  

  constructor(private http: Http, private storage: Storage) {
    this.host = 'http://55ce3faa.ngrok.io';
    
    this.humiMin = 10;
    this.humiMax = 80;
    //this.humiValue = this.humiMin;
    this.getLastValue();
    // this.toast.show(`'hello'`,'5000','center').subscribe(
    //   toast=>{
    //     console.log(toast);
    //   }
    // );
  }

  getLastValue() {
    this.storage.get('humidity').then((value) => {
      if (value == null) {
        this.humiValue = this.humiMin;
        console.log(value);
      }
      else {
        this.humiValue = value;
      }
    })
  }

  showValue(humi) {
    this.humiValue = humi;
  }

  confirmHumi() {
    var data = {
      humiValue: this.humiValue
    }
    //public ip:192.122.131.145
    //private ip:192.168.96.200
    //http://580314eb.ngrok.io
    //server: https://server-control.herokuapp.com

    this.http.post(this.host + '/humidity', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('HUMIDITY POST Response:', response);
    });

    this.http.get(this.host + '/humidity/' + this.humiValue).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('HUMIDITY GET Response:', response);
    });

    this.storage.set('humidity',this.humiValue);
    
  }

}
