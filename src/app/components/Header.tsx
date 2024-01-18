"use client";
import { useWeatherStore } from "../hooks/weatherStore";
import fetchWeather from "../services/fetchWeather";
import SearchBar from "./SearchBar";
import UnitySelector from "./UnitySelector";
import { TApiError } from "@/app/types/api.type";
import { errorToast } from "../utils/NotifyErrorToast";

const Header = () => {
  const { unit, searchText, setWeatherInfo, setFetching } = useWeatherStore(
    (state) => ({
      unit: state.unit,
      searchText: state.searchText,
      setWeatherInfo: state.setWeatherInfo,
      setFetching: state.setFetching,
    })
  );

  const searchFunction = async () => {
    try {
      setFetching(true);
      const resp = await fetchWeather({ query: searchText });
      setWeatherInfo(resp);
    } catch (err) {
      const { message } = err as TApiError;
      errorToast(message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <header className="flex items-center md:flex-row flex-col justify-between px-6 py-4 bg-gray-800">
      <h1 className="text-2xl font-bold text-gray-200 md:mb-0 mb-4">
        Weather App
      </h1>
      <div className="flex items-center">
        <UnitySelector />
        <div className="relative flex-1 ml-auto sm:flex-initial ">
          <SearchBar searchFunction={searchFunction} />
        </div>
      </div>
    </header>
  );
};

export default Header;
