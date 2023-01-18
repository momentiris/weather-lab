import { numberFormatter } from '../utils';
import { TemperatureInfo } from './temperature-info';

type Props = {
  day: string;
  average: number;
  median: number;
  min: number;
  max: number;
};

export const WeatherInfoPreviewCard = (props: Props) => (
  <div className="h-[225px] min-w-[225px] transform rounded-lg bg-blue-100 shadow-lg duration-150 hover:scale-[102%]">
    <div className="mr-auto rounded-t-lg bg-gray-700 py-2 pl-3 text-sm font-semibold text-white first-letter:capitalize">
      {props.day}
    </div>
    <div className="flex w-full flex-col gap-2 p-4 text-sm">
      <TemperatureInfo
        label="Medel:"
        value={numberFormatter.format(props.average)}
      />
      <TemperatureInfo
        label="Median:"
        value={numberFormatter.format(props.median)}
      />
      <TemperatureInfo
        label="Varmast:"
        value={numberFormatter.format(props.max)}
      />
      <TemperatureInfo
        label="Kallast:"
        value={numberFormatter.format(props.min)}
      />
    </div>
  </div>
);
