"use client";
import { useWeatherStore } from "@/app/hooks/weatherStore";
import clsx from "clsx";

const UnitySelector = () => {
  const { unit, setUnit } = useWeatherStore((state) => ({
    unit: state.unit,
    setUnit: state.setUnit,
  }));

  const handleClick = (unit: "i" | "m") => {
    setUnit(unit);
  };

  return (
    <div className="mr-6 flex gap-2 md:relative absolute right-0 md:top-0 top-5">
      <p
        className={clsx(
          "cursor-pointer",
          `text-gray-${[500, 200][Number(unit !== "i")]}`
        )}
        onClick={() => handleClick("m")}
      >
        °C
      </p>
      <span className="text-gray-400">|</span>
      <p
        className={clsx(
          "cursor-pointer",
          `text-gray-${[500, 200][Number(unit === "i")]}`
        )}
        onClick={() => handleClick("i")}
      >
        °F
      </p>
    </div>
  );
};

export default UnitySelector;
