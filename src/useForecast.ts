import { useQuery } from '@tanstack/react-query';
import { pipe } from 'fp-ts/function';
import * as A from 'fp-ts/NonEmptyArray';
import * as R from 'fp-ts/Record';

import { Api } from './api';
import { RemoteForecast, WeatherInfo } from './types';
import { extractProperty } from './utils';

const groupByDay = A.groupBy<WeatherInfo>((x) => x.dt_txt.split(' ')[0]);

const normalizeForecast = (data: RemoteForecast) =>
  pipe(
    data,
    extractProperty('list'),
    groupByDay,
    R.toArray,
    (x) => x.slice(0, 4),
    R.fromEntries
  );

export const useForecast = () =>
  useQuery(['forecast'], () => Api.getForecast().then(normalizeForecast));
