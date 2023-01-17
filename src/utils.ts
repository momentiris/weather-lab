import { pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as N from 'fp-ts/number';

import { WeatherInfo } from './types';

export const extractProperty =
  <T>(prop: keyof T) =>
  (val: T): T[typeof prop] =>
    val[prop];

export const getAverageTemp = (temps: Array<WeatherInfo>) =>
  pipe(
    temps,
    A.map((x) => x.main.temp),
    A.reduce(0, (acc, curr) => acc + curr),
    (x) => x / temps.length,
    (x) => Math.round(x * 100) / 100
  );

const getMedianPrimitiveArray = (numbers: Array<number>) => {
  const isEvenLength = numbers.length % 2 === 0;
  const middle = Math.floor(numbers.length / 2);

  if (isEvenLength) {
    return numbers[middle];
  }

  return (numbers[middle] + numbers[middle + 1]) / 2;
};

export const getMedianTemp = (temps: Array<WeatherInfo>) =>
  pipe(
    temps,
    A.map((x) => x.main.temp),
    A.sort(N.Ord),
    getMedianPrimitiveArray
  );

export const getMinTemp = (temps: Array<WeatherInfo>) =>
  pipe(
    temps,
    A.map((x) => x.main.temp_min),
    A.sort(N.Ord),
    (x) => x[0]
  );

export const getMaxTemp = (temps: Array<WeatherInfo>) =>
  pipe(
    temps,
    A.map((x) => x.main.temp_max),
    A.sort(N.Ord),
    A.reverse,
    (x) => x[0]
  );
