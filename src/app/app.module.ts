import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { CounterPage } from '../pages/counter/counter';
import { AboutPage } from '../pages/about/about';

import { Components } from '../components';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

export function ngReduxFactory() {
    return new NgRedux<IAppState>();
}

@NgModule({
  declarations: [
    MyApp,
    CounterPage,
    AboutPage,
    ...Components
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CounterPage,
    AboutPage,
  ],
  providers: [
    { provide: NgRedux, useFactory: ngReduxFactory }
  ]
})
export class AppModule {}
