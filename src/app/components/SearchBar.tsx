"use client";
import { useWeatherStore } from "@/app/hooks/weatherStore";

const SearchIcon = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className: string;
}) => {
  return (
    <div onClick={onClick}>
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </div>
  );
};

const SearchBar = ({ searchFunction }: { searchFunction: () => void }) => {
  const { searchText, setSearchtext } = useWeatherStore((state) => ({
    searchText: state.searchText,
    setSearchtext: state.setSearchtext,
  }));

  return (
    <div className="relative">
      <SearchIcon
        onClick={searchFunction}
        className="absolute left-3 top-3 h-4 w-4 text-gray-400 cursor-pointer"
      />
      <input
        value={searchText}
        type="text"
        onChange={(event) => setSearchtext(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            searchFunction();
          }
        }}
        placeholder="Search cities..."
        className="w-full lg:w-[300px] bg-gray-700 text-white placeholder-gray-400 py-2 pl-10 pr-6 rounded-md"
      />
    </div>
  );
};

export default SearchBar;
