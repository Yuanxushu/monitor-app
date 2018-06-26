import { Component } from '@angular/core';
import { Http } from '@angular/http';
//import { NavController } from 'ionic-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-light',
  templateUrl: 'light.html'
})
export class LightPage {
  lightValue: number
  lightMin: number
  lightMax: number

  constructor(private http: Http) {
    this.lightMin = 10;
    this.lightMax = 80;
    this.lightValue = this.lightMin;
  }

  showValue(light) {

    this.lightValue = light;

  }

  confirmLight() {
    var data = {
      lightValue: this.lightValue
    }

    this.http.post('http://localhost:8000/light', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('LIGHT POST Response:', response);
      //console.log(this.lightValue);
    });

    this.http.get('http://localhost:8000/light/' + this.lightValue).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('LIGHT GET Response:', response);
    });

  }
}


