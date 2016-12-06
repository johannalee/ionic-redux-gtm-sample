import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { ICounter } from '../../store';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';
import { CounterActions } from '../../actions';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-counter',
  providers: [ AsyncPipe, CounterActions ],
  templateUrl: 'counter.html'
})
export class CounterPage {
  @select() counter$: Observable<ICounter>;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public actions: CounterActions) {
  }

  navigate() {
    this.navCtrl.push(AboutPage, {});
  }
}
