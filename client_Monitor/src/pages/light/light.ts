import { Component } from '@angular/core';
import { Http } from '@angular/http';
//import { NavController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-light',
  templateUrl: 'light.html'
})
export class LightPage {
  host: string

  lightValue: number
  lightMin: number
  lightMax: number

  switchStatus: boolean

  constructor(private http: Http, private storage: Storage) {
    this.lightMin = 0;
    this.lightMax = 100;
    this.getLastValue();
    this.host = 'http://55ce3faa.ngrok.io'
  }

  getLastValue() {
    this.storage.get('lightValue').then((value) => {
      if (value == null) {
        this.lightValue = this.lightMin;
        console.log(value);
      }
      else {
        this.lightValue = value;
      }
    });

    this.storage.get('switchStatus').then((value) => {
      this.switchStatus = value;
    });
  }

  showValue(light) {
    this.lightValue = light;
  }

  //toggle
  switchLight() {
    var data = {
      switchStatus: this.switchStatus
    }

    this.http.post(this.host+'/light_switch', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('SWITCH POST Response:', response);
    });

    this.http.get(this.host + '/light_switch/' + this.switchStatus).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('SWITCH GET Response:', response);
    });

    //save the data
    this.storage.set('switchStatus', this.switchStatus);

  }
  
  //slider
  confirmLight() {
    var data = {
      lightValue: this.lightValue
    }

    //public ip:192.122.131.145
    //private ip:192.168.96.200
    //http://55ce3faa.ngrok.io
    this.http.post(this.host + '/light', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('LIGHT POST Response:', response);
      //console.log(this.lightValue);
    });

    this.http.get(this.host + '/light/' + this.lightValue).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('LIGHT GET Response:', response);
    });

    //save the data
    this.storage.set('lightValue', this.lightValue);

  }
}


