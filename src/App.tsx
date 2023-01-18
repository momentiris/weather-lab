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

const TemperatureInfo = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex justify-between">
    <span className="font-medium">{label}</span>
    <span className="font-bold">{value}°</span>
  </div>
);

const WeatherInfoPreviewCard = ({
  average,
  median,
  min,
  max,
  day,
}: WeatherInfoPreviewCardProps) => (
  <div className="h-[225px] min-w-[225px] transform rounded-lg bg-blue-100 shadow-lg duration-150 hover:scale-[102%]">
    <div className="mr-auto rounded-t-lg bg-gray-700 py-2 pl-3 text-sm font-semibold text-white first-letter:capitalize">
      {day}
    </div>
    <div className="flex w-full flex-col gap-2 p-4 text-sm">
      <TemperatureInfo
        label="Medel:"
        value={temperatureFormatter.format(average)}
      />
      <TemperatureInfo
        label="Median:"
        value={temperatureFormatter.format(median)}
      />
      <TemperatureInfo
        label="Varmast:"
        value={temperatureFormatter.format(max)}
      />
      <TemperatureInfo
        label="Kallast:"
        value={temperatureFormatter.format(min)}
      />
    </div>
  </div>
);

const WeatherInfoPreview = ({ date, info }: WeatherInfoPreviewProps) => {
  const dateToString = formatWithOptions({ locale: sv }, 'eeee');
  const dateStr = isToday(date) ? 'idag' : dateToString(date);

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
      <div className="h-full w-full max-w-screen-lg pt-16">
        <Header />
        <div className="mt-8 flex w-full max-w-screen-lg flex-wrap gap-6 rounded-lg">
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
    <h1 className="text-5xl font-bold tracking-wide">Det soliga Göteborg</h1>
    <div className=" tracking-wide text-gray-600">
      Väderprognos för de kommande fyra dagarna.
    </div>
  </header>
);
export default App;
