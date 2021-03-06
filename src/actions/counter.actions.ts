import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

@Injectable()
export class CounterActions {
  static INCREMENT_COUNTER = 'INCREMENT_COUNTER';
  static DECREMENT_COUNTER = 'DECREMENT_COUNTER';
  static UPDATE_CONNECTIVITY = 'UPDATE_CONNECTIVITY';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  increment() {
    this.ngRedux.dispatch({ type: CounterActions.INCREMENT_COUNTER });
  }

  decrement() {
    this.ngRedux.dispatch({ type: CounterActions.DECREMENT_COUNTER });
  }

  updateConnectivity(isChecked: boolean) {
    this.ngRedux.dispatch({
      type: CounterActions.UPDATE_CONNECTIVITY,
      payload: !isChecked,
    });
  }
}
