"use client";
import WeatherCard from "./components/WeatherCard";
import { useWeatherStore } from "@/app/hooks/weatherStore";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import { useEffect, useCallback } from "react";
import fetchWeather from "./services/fetchWeather";
import { TApiError } from "@/app/types/api.type";
import { errorToast } from "./utils/NotifyErrorToast";
import Image from "next/image";

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Home = () => {
  const { unit, weatherInfo, fetching, setWeatherInfo, setFetching } =
    useWeatherStore((state) => ({
      unit: state.unit,
      weatherInfo: state.weatherInfo,
      fetching: state.fetching,
      setWeatherInfo: state.setWeatherInfo,
      setFetching: state.setFetching,
    }));

  const setLocationStart = useCallback(
    async (query: string) => {
      try {
        setFetching(true);
        const resp = await fetchWeather({ query });
        setWeatherInfo(resp);
      } catch (err) {
        const { message } = err as TApiError;
        errorToast(message);
      } finally {
        setFetching(false);
      }
    },
    [setFetching, setWeatherInfo]
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocationStart(`${latitude},${longitude}`);
      });
    }
  }, [setLocationStart]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <main className="flex flex-1 flex-col items-center justify-center p-6 ">
        {fetching && <Loader />}
        {weatherInfo && (
          <>
            <WeatherCard weatherInfo={weatherInfo} unit={unit} />
            <ul className="grid lg:grid-cols-5 md:grid-cols-3 grid-row gap-4 w-full max-w-6xl">
              {weatherInfo.forecastData.map((day) => (
                <li
                  key={day.date}
                  className="flex flex-col items-center bg-gray-800 p-4 rounded-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-200 border-opacity-20"
                >
                  <p className="text-lg text-gray-200">
                    {weekday[new Date(day.date).getDay()]}
                  </p>

                  <Image
                    src={`https:${day.icon}`}
                    width={40}
                    height={40}
                    alt={`${day.condition} icon`}
                  />

                  <p className="text-lg text-gray-200">
                    {
                      [
                        <span key="avr-temp-f">{day.avgTempF}°F</span>,
                        <span key="avr-temp-c">{day.avgTempC}°C</span>,
                      ][Number(unit === "m")]
                    }
                  </p>
                  <p className="text-sm text-gray-400">{day.condition}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
