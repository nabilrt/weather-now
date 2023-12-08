"use client";
import Select from "react-select";
import Button from "@/modules/button";
import { useWeather } from "@/lib/contexts/weather-context";
import WeatherCard from "@/modules/weather-card";
import { FadeLoader } from "react-spinners";

const HomePage = () => {
  const {
    state,
    clearInputs,
    handleCountry,
    handleCity,
    fetchWeather,
    isPending,
  } = useWeather();

  return (
    <div className="p-4 text-center">
      <div>
        <div className="flex flex-col ">
          <div className=" p-1 shadow-2xl bg-transparent border-solid border-[#41738d] border-[1px]">
            <img
              src="/logo1.png"
              height="250px"
              width="150px"
              className="m-auto"
            ></img>

            <div className="flex flex-row  space-x-3 justify-center mb-8 ">
              <Select
                options={state.countries}
                value={state.country}
                onChange={(e) => handleCountry(e)}
                isSearchable={true}
                placeholder="Select Country"
                className="w-1/4"
              />

              <Select
                options={isPending ? <FadeLoader /> : state.cities}
                value={state.city}
                onChange={(e) => handleCity(e)}
                isDisabled={state.cities.length === 0}
                isSearchable={true}
                placeholder="Select City"
                className="w-1/4"
              />
              <Button
                variant="primary"
                className="px-4 py-2 rounded-md font-semibold text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-white bg-blue-600 hover:bg-blue-800"
                disabled={!state.country}
                onClick={() => fetchWeather(state.country, state.city)}
              >
                Search
              </Button>
              <Button
                variant="danger"
                className="px-4 py-2 rounded-md font-semibold text-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-white bg-red-600 hover:bg-red-800"
                disabled={!state.country}
                onClick={clearInputs}
              >
                Clear
              </Button>
            </div>
          </div>
          <WeatherCard state={state} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
