import { Component } from '@angular/core';
import { Http } from '@angular/http';
//import { NavController } from 'ionic-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-humidity',
  templateUrl: 'humidity.html'
})
export class HumidityPage {
  humiValue: number
  humiMin: number
  humiMax: number

  constructor(private http: Http) {
    this.humiMin = 10;
    this.humiMax = 80;
    this.humiValue = this.humiMin;
  }

  showValue(humi) {
    this.humiValue = humi;
  }

  confirmHumi() {
    var data = {
      humiValue: this.humiValue
    }

    this.http.post('http://localhost:8000/humidity', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('HUMIDITY POST Response:', response);
    });

    this.http.get('http://localhost:8000/humidity/' + this.humiValue).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('HUMIDITY GET Response:', response);
    });
  }

}
