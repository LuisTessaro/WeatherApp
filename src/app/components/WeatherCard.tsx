import Image from "next/image";
import { TWeather } from "@/app/types/weather.type";

type TWeatherCard = {
  weatherInfo?: TWeather;
  unit: "i" | "m";
};

const WeatherCard = ({ weatherInfo, unit }: TWeatherCard) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <h2 className="text-4xl font-bold text-gray-200 text-center">
        {weatherInfo?.location}
      </h2>

      <div className="text-xl text-gray-400 flex sm:flex-row w-full flex-col justify-center text-center">
        <p className="flex sm:w-auto w-full sm:justify-start justify-center">
          <span className="mr-2">{weatherInfo?.condition}</span>
          <Image
            src={`https:${weatherInfo?.icon}`}
            width={25}
            height={25}
            alt={`${weatherInfo?.condition} icon`}
            className="mr-2"
          />
        </p>
        <p className="flex justify-center">
          <span className="sm:flex hidden mr-2">|</span> {weatherInfo?.humidity}
          %💧
          <span className="sm:flex hidden mr-2">|</span>
        </p>
        <p>
          {[weatherInfo?.visMiles, weatherInfo?.visKm][Number(unit === "m")]}{" "}
          {["Mp/h", "Km/h"][Number(unit === "m")]} 💨
        </p>
      </div>

      <p className="text-6xl font-bold text-gray-200">
        {[weatherInfo?.tempF, weatherInfo?.tempC][Number(unit === "m")]}
        {["°F", "°C"][Number(unit === "m")]}
      </p>
    </div>
  );
};

export default WeatherCard;
