import { Component } from '@angular/core';
import { Http } from '@angular/http';
//import { NavController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-pressure',
  templateUrl: 'pressure.html'
})
export class PressurePage {
  pressureValue: number
  pressureMin: number
  pressureMax: number

  constructor(private http: Http, private storage: Storage) {
    this.pressureMin = 1;
    this.pressureMax = 10;
    //this.pressureValue = this.pressureMin;
    this.getLastValue();
  }

  getLastValue() {
    this.storage.get('pressure').then((value) =>{
      if (value == null) {
        this.pressureValue = this.pressureMin;
        //console.log(value);
      }
      else {
        this.pressureValue = value;
      }
    })
  }

  showValue(pressure) {
    this.pressureValue = pressure;
  }

  confirmPressure() {
    var data = {
      pressureValue: this.pressureValue
    }
    //public ip:192.122.131.145
    //private ip:192.168.96.200
    //http://784a7de7.ngrok.io
    //server: https://server-control.herokuapp.com

    this.http.post('http://8e6a536c.ngrok.io/pressure', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('PRESSURE POST Response:', response);
    });

    this.http.get('http://8e6a536c.ngrok.io/pressure/' + this.pressureValue).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('PRESSURE GET Response:', response);
    });
    this.storage.set('pressure',this.pressureValue);
  }

  
   
 
}