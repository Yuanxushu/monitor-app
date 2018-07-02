import { Component } from '@angular/core';
import { Http } from '@angular/http';
//import { NavController } from 'ionic-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-pressure',
  templateUrl: 'pressure.html'
})
export class PressurePage {
  pressureValue: number
  pressureMin: number
  pressureMax: number

  constructor(private http: Http) {
    this.pressureMin = 10;
    this.pressureMax = 30;
    this.pressureValue = this.pressureMin;
  }

  showValue(pressure) {
    this.pressureValue = pressure;
  }

  confirmPressure() {
    var data = {
      pressureValue: this.pressureValue
    }

    this.http.post('http://localhost:8000/pressure', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('PRESSURE POST Response:', response);
    });

    this.http.get('http://localhost:8000/pressure/' + this.pressureValue).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('PRESSURE GET Response:', response);
    });
  }

   
 
}