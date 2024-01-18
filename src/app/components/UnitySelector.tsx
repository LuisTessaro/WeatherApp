"use client";
import { useWeatherStore } from "@/app/hooks/weatherStore";

const UnitySelector = () => {
  const { unit, setUnit } = useWeatherStore((state) => ({
    unit: state.unit,
    setUnit: state.setUnit,
  }));

  return (
    <>
      <select
        className="bg-gray-700 text-gray-200"
        name="unit"
        value={unit}
        onChange={(event) => setUnit(event.target.value as "i" | "m")}
      >
        <option value="i">°F</option>
        <option value="m">°C</option>
      </select>
    </>
  );
};

export default UnitySelector;
