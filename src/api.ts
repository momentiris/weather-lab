import axios from 'axios';

import { API_KEY, BASE_COORDINATES } from './constants';
import { RemoteForecast } from './types';

export const Api = { getForecast };

function getForecast(coordinates = BASE_COORDINATES) {
  return axios
    .get<RemoteForecast>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lng}&units=metric&appid=${API_KEY}`
    )
    .then((res) => res.data);
}
