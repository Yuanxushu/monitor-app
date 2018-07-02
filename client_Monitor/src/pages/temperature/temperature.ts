import { Component } from '@angular/core';
import { Http } from '@angular/http';
//import { NavController } from 'ionic-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-temperature',
  templateUrl: 'temperature.html'
})
export class TemperaturePage {
  tempValue: number
  tempMin: number
  tempMax: number

  constructor(private http: Http) {
    this.tempMin = 10;
    this.tempMax = 30;
    this.tempValue = this.tempMin;
  }

  showValue(temp) {
    this.tempValue = temp;
  }

  confirmTemp() {
    var data = {
      tempValue: this.tempValue
    }

    this.http.post('http://localhost:8000/temp', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('TEMP POST Response:', response);
    });

    this.http.get('http://localhost:8000/temp/' + this.tempValue).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('TEMP GET Response:', response);
    });
  }

}