import { Component, ViewChild, HostListener } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { CounterPage } from '../pages/counter/counter';
import { AboutPage } from '../pages/about/about';

import { middleware, enhancers } from '../store';
import { NgRedux } from 'ng2-redux';
import { IAppState, rootReducer } from '../store';

import { createMiddleware, EventHelpers, Extensions } from 'redux-gtm';
const { createGAevent, createGApageview } = EventHelpers;

const logger = Extensions.logger();
const eventDefinitionsMap = {
  INCREMENT_COUNTER: {
    eventFields: (prevState, action) => {
        return createGAevent({
            eventAction: 'Increment Counter',
            eventCategory: 'Counter',
        });
    },
  },
  DECREMENT_COUNTER: {
    eventFields: (prevState, action) => {
        return createGAevent({
            eventAction: 'Decrement Counter',
            eventCategory: 'Counter',
        });
    },
  },
  VIEW_CHANGED: {
    eventFields: (prevState, action) => {
      return createGApageview(action.payload);
    }
  }
};

const isConnected = state => state.counter.toJS().isConnected;
const offlineStorage = Extensions.offlineWeb(isConnected);

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  @HostListener('window:online', ['$event'])
  setOnlineConnectivity(event) {
    console.log('online');
    this.ngRedux.dispatch({
      type: 'UPDATE_CONNECTIVITY',
      payload: true,
    });
  }

  @HostListener('window:offline', ['$event'])
  setOfflineConnectivity(event) {
    console.log('offline');
    this.ngRedux.dispatch({
      type: 'UPDATE_CONNECTIVITY',
      payload: false,
    });
  }

  rootPage: any = CounterPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private ngRedux: NgRedux<IAppState>) {
      this.initializeApp();

      this.pages = [
        { title: 'Counter', component: CounterPage },
        { title: 'About', component: AboutPage },
      ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      middleware.push(createMiddleware(eventDefinitionsMap, { offlineStorage, logger }));

      this.ngRedux.configureStore(rootReducer, {}, middleware, enhancers);
    });
  }

  openPage(page) {
    // dispatch nav action
    var currentPage = this.nav.getActive().component;

    if (currentPage.name !== page.component.name) {
      this.ngRedux.dispatch({
        type: 'VIEW_CHANGED',
        payload: page.title,
      });
    }

    // close the menu when clicking a link from the menu
    this.menu.close();

    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
