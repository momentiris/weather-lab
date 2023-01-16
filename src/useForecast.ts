import { useQuery } from '@tanstack/react-query';
import { pipe } from 'fp-ts/function';
import * as NEA from 'fp-ts/NonEmptyArray';
import * as R from 'fp-ts/Record';
import * as T from 'fp-ts/ReadOnlyTuple';

import { Api } from './api';
import { RemoteForecast, WeatherInfo } from './types';

const extract =
  <T>(prop: keyof T) =>
  (val: T): T[typeof prop] =>
    val[prop];

const groupByDay = NEA.groupBy<WeatherInfo>((x) => x.dt_txt.split(' ')[0]);

const normalizeForecast = (data: RemoteForecast) =>
  pipe(data, extract('list'), groupByDay, R.toArray, (x) => x.map(T.snd));

export const useForecast = () =>
  useQuery(['forecast'], () => Api.getForecast().then(normalizeForecast));
