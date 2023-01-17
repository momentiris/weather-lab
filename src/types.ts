import { z } from 'zod';

const WeatherInfoRemoteSchema = z.object({
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
  dt_txt: z.string(),
});

const RemoteForecastRemoteSchema = z.object({
  list: z.array(WeatherInfoRemoteSchema),
});

export type WeatherInfo = z.infer<typeof WeatherInfoRemoteSchema>;
export type RemoteForecast = z.infer<typeof RemoteForecastRemoteSchema>;

export type NormalizedForecast = Array<Array<WeatherInfo['main']>>;
