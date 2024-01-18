import { create } from "zustand";
import { TWeather } from "../types/weather.type";

type TUseWeatherStore = {
  weatherInfo: TWeather | null;
  searchText: string;
  unit: "i" | "m";
  fetching: boolean;
  setSearchtext: (searchText: string) => void;
  setUnit: (unit: "i" | "m") => void;
  setWeatherInfo: (weatherInfo: TWeather) => void;
  setFetching: (fetching: boolean) => void;
};

export const useWeatherStore = create<TUseWeatherStore>((set) => ({
  weatherInfo: null,
  searchText: "",
  unit: "i",
  fetching: false,
  setSearchtext: (searchText) => set(() => ({ searchText: searchText })),
  setUnit: (unit) => set(() => ({ unit: unit })),
  setWeatherInfo: (weatherInfo) => set(() => ({ weatherInfo: weatherInfo })),
  setFetching: (fetching) => set(() => ({ fetching: fetching })),
}));
