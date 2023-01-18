import { isToday } from 'date-fns';
import { formatWithOptions } from 'date-fns/fp';
import { sv } from 'date-fns/locale';

import { WeatherInfo } from '../types';
import { WeatherInfoPreviewCard } from './weather-info-preview-card';
import * as Utils from '../utils';

type Props = { date: Date; info: Array<WeatherInfo> };

export const WeatherInfoPreview = ({ date, info }: Props) => {
  const dateToString = formatWithOptions({ locale: sv }, 'eeee');
  const dateStr = isToday(date) ? 'idag' : dateToString(date);

  const average = Utils.getAverageTemp(info);
  const median = Utils.getMedianTemp(info);
  const min = Utils.getMinTemp(info);
  const max = Utils.getMaxTemp(info);

  return (
    <WeatherInfoPreviewCard
      day={dateStr}
      average={average}
      median={median}
      min={min}
      max={max}
    />
  );
};
