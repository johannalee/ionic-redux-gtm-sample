import { TypedRecord } from 'typed-immutable-record';

export interface ICounter {
  counter: number;
  isConnected: boolean;
};

export interface ICounterRecord extends TypedRecord<ICounterRecord>, ICounter {
};
