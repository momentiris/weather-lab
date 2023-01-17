import { isToday } from 'date-fns';
import { formatWithOptions } from 'date-fns/fp';
import { sv } from 'date-fns/locale';

import { WeatherInfo } from './types';
import { useForecast } from './useForecast';
import { getAverageTemp, getMaxTemp, getMedianTemp, getMinTemp } from './utils';

type WeatherInfoPreviewProps = { date: Date; info: Array<WeatherInfo> };
type WeatherInfoPreviewCardProps = {
  day: string;
  average: number;
  median: number;
  min: number;
  max: number;
};

const temperatureFormatter = Intl.NumberFormat('sv', {
  maximumFractionDigits: 2,
});

const WeatherInfoPreviewCard = ({
  average,
  median,
  min,
  max,
  day,
}: WeatherInfoPreviewCardProps) => (
  <div className="flex flex-col items-center justify-center rounded-lg border-4">
    <span className="mr-auto py-2 pl-3 text-sm font-semibold first-letter:capitalize">
      {day}
    </span>
    <div className="px-12 pb-12 pt-8 text-sm">
      <div> Average: {temperatureFormatter.format(average)}</div>
      <div> median: {temperatureFormatter.format(median)}</div>
      <div> min: {temperatureFormatter.format(min)}</div>
      <div> max: {temperatureFormatter.format(max)}</div>
    </div>
  </div>
);

const WeatherInfoPreview = ({ date, info }: WeatherInfoPreviewProps) => {
  const dateToString = formatWithOptions({ locale: sv }, 'eeee');
  const dateStr = isToday(date) ? 'today' : dateToString(date);

  const average = getAverageTemp(info);
  const median = getMedianTemp(info);
  const min = getMinTemp(info);
  const max = getMaxTemp(info);

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

function App() {
  const { data } = useForecast();

  if (!data) {
    return <div>loading</div>;
  }
  console.log(data);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center py-8 px-4">
      <div className="h-full w-full max-w-screen-lg pt-12">
        <Header />
        <div className="mt-8 flex w-full max-w-screen-lg flex-wrap gap-4 rounded-lg">
          {Object.entries(data).map(([dateStr, weatherInfo]) => (
            <WeatherInfoPreview
              key={dateStr}
              date={new Date(dateStr)}
              info={weatherInfo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const Header = () => (
  <header>
    <h1 className="text-4xl font-bold tracking-wide">Det soliga Göteborg</h1>
    <div className="text-sm tracking-wide text-gray-600">
      Väderprognos för de kommande fyra dagarna.
    </div>
  </header>
);
export default App;
