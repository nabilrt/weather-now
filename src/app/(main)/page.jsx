"use client";
import Select from "react-select";
import Button from "@/modules/button";
import { useWeather } from "@/lib/contexts/weather-context";
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

  function formatDateTime(inputDateString) {
    const dateObject = new Date(inputDateString);

    const dateOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };

    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
      dateObject
    );
    const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
      dateObject
    );

    return {
      date: formattedDate,
      time: formattedTime,
    };
  }

  return (
    <div className="p-4 text-center">
      <div>
        <div className="flex flex-col ">
          <div className=" p-1 shadow-2xl bg-transparent border-solid border-[#41738d] border-[1px]">
           <img src="/logo1.png" height="250px" width="150px" className="m-auto"></img>
           
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
                options={isPending ? { value: "", label: "" } : state.cities}
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
          {Object.keys(state.weatherCondition).length === 0 &&
            !state.loading && (
              <div className="flex flex-row justify-center w-1/2 m-auto mt-4">
                <h2 className="font-semibold text-base text-white">
                  Select Country or both Country and City to get started
                </h2>
              </div>
            )}

          {state.loading ? (
            <div className="flex flex-row justify-center w-1/2 m-auto mt-6">
              <FadeLoader color="#37388D" />
            </div>
          ) : (
            <div>
              {Object.keys(state.weatherCondition).length !== 0 && (
                <div className="flex flex-row justify-center w-1/2 m-auto mt-5">
                  <div
                    className={`border-solid border-[#41738d] border shadow-md w-1/2 mr-4  text-white bg-transparent`}
                  >
                    <div className="flex text-left pl-3 pt-2">
                      <img
                        src="clock.png"
                        height="20px"
                        width="25px"
                        className="mr-2"
                      ></img>
                      <h2 className="font-semibold text-sm">
                        {formatDateTime(state.weatherLocation.localtime).time}
                      </h2>
                      <h2 className="m-auto mr-3 items-right font-semibold text-sm">
                        {formatDateTime(state.weatherLocation.localtime).date}
                      </h2>
                    </div>
                    <div className="inline-flex m-auto">
                      <img
                        src={state.weatherCondition.condition.icon}
                        className=""
                        height="50px"
                        width="100px"
                        alt="Weather Icon"
                      />
                      <div className="text-center">
                        <h4 className="mt-7 text-lg font-semibold">
                          {state.city
                            ? state.city.label + ", " + state.country.iso2
                            : state.country.label}
                        </h4>
                        <h4 className="mb-2 text-left text-sm">
                          {state.weatherCondition.condition.text}
                        </h4>
                      </div>
                    </div>
                    <h4 className="mb-2 text-sm">
                      Feels Like {state.weatherCondition.feelslike_c}°
                    </h4>
                    <h4 className="mb-9 ml-6 text-7xl font-bold">
                      {state.weatherCondition.temp_c}°
                    </h4>
                    <div className="flex text-left pl-3 pt-2">
                      <img
                        src="wind.png"
                        height="20px"
                        width="25px"
                        className="mr-2 mb-2"
                        alt="Wind Icon"
                      />
                      <h2 className="font-semibold text-sm mt-1">
                        {state.weatherCondition.wind_dir}{" "}
                        {state.weatherCondition.wind_kph} KPH
                      </h2>
                      <div className="flex items-center ml-auto">
                        <img
                          src="drop.png"
                          height="20px"
                          width="25px"
                          className="mb-2 mr-2"
                          alt="Drop Icon"
                        />
                        <h2 className="font-semibold text-sm mr-3">
                          {state.weatherCondition.humidity} %
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
