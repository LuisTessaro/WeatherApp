import {
  TFetchWeather,
  TWeather,
  TForecastRequest,
} from "../types/weather.type";

const fetchWeather = async ({ query }: TFetchWeather): Promise<TWeather> => {
  const resp = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${query}&days=6&key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  );

  const data = await resp.json();

  if (data.error) throw data.error;

  const { location, current, forecast } = data;

  return {
    localTime: location.localtime,
    location: `${location.name}, ${location.region}, ${location.country}`,
    tempC: current.temp_c,
    tempF: current.temp_f,
    visKm: current.vis_km,
    visMiles: current.vis_miles,
    humidity: current.humidity,
    condition: current.condition.text,
    icon: current.condition.icon,
    forecastData: forecast.forecastday
      .slice(1)
      .map((forecastDayObj: TForecastRequest) => ({
        date: forecastDayObj.date,
        avgTempC: forecastDayObj.day.avgtemp_c,
        avgTempF: forecastDayObj.day.avgtemp_f,
        condition: forecastDayObj.day.condition.text,
        icon: forecastDayObj.day.condition.icon,
      })),
  };
};

export default fetchWeather;
