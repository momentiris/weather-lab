import { FadeIn } from './components/fade-in';
import { Header } from './components/header';
import { WeatherInfoPreview } from './components/weather-info-preview';
import { useForecast } from './queries/useForecast';

function App() {
  const { data } = useForecast();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center py-8 px-4">
      <div className="h-full w-full max-w-screen-lg pt-16">
        <Header />
        <div className="mt-8 flex w-full max-w-screen-lg flex-wrap gap-6">
          {!data ? (
            'loading weather...'
          ) : (
            <FadeIn className="flex h-full w-full flex-wrap gap-6">
              {Object.entries(data).map(([dateStr, weatherInfo]) => (
                <WeatherInfoPreview
                  key={dateStr}
                  date={new Date(dateStr)}
                  info={weatherInfo}
                />
              ))}
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
