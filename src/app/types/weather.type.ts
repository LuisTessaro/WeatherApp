export type TForecastRequest = {
  date: string;
  day: {
    avgtemp_c: number;
    avgtemp_f: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};

type TForecast = {
  date: string;
  avgTempC: number;
  avgTempF: number;
  condition: string;
  icon: string;
};

export type TWeather = {
  localTime: string;
  location: string;
  tempC: number;
  tempF: number;
  visKm: number;
  visMiles: number;
  humidity: number;
  condition: string;
  forecastData: TForecast[];
  icon: string;
};

export type TFetchWeather = {
  query: string;
  unit?: "m" | "i";
};
