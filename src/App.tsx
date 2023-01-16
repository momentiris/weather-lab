import { useForecast } from './useForecast';

function App() {
  const { data } = useForecast();
  console.log(data);
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <header className="flex w-full max-w-md flex-col items-center">
        <h1 className="text-2xl font-bold">test</h1>
      </header>
    </div>
  );
}

export default App;
