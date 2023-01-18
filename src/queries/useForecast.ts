import { useQuery } from '@tanstack/react-query';

import { Api } from '../api';
import * as Utils from '../utils';

export const useForecast = () =>
  useQuery(['forecast'], () => Api.getForecast().then(Utils.normalizeForecast));
