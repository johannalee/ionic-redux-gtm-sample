import {
  ICounterRecord,
  ICounter,
} from './counter.types';
import { makeTypedFactory } from 'typed-immutable-record';

export const CounterFactory = makeTypedFactory<ICounter, ICounterRecord>({
  counter: 0,
  isConnected: true,
});

export const INITIAL_STATE = CounterFactory();
