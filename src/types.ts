import { z } from 'zod';

const WeatherInfoRemoteSchema = z.object({
  main: z.object({ temp: z.number(), max: z.number(), min: z.number() }),
  dt_txt: z.string(),
});

const RemoteForecastRemoteSchema = z.object({
  list: z.array(WeatherInfoRemoteSchema),
});

export type WeatherInfo = z.infer<typeof WeatherInfoRemoteSchema>;
export type RemoteForecast = z.infer<typeof RemoteForecastRemoteSchema>;

export type NormalizedForecast = Array<Array<WeatherInfo['main']>>;
